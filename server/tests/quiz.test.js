const request = require('supertest');
const app = require('../app');
const { connect, disconnect, clear } = require('./testDb');

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await disconnect());

// ── Test credentials — sourced from env (set in testDb.js) ────────────────
const TEST_ADMIN   = { name: 'Admin',   email: process.env.TEST_ADMIN_EMAIL   || 'admin@test.com',   password: process.env.TEST_ADMIN_PASS   || 'pass123' };
const TEST_STUDENT = { name: 'Student', email: process.env.TEST_STUDENT_EMAIL || 'student@test.com', password: process.env.TEST_STUDENT_PASS || 'pass123' };

let adminToken, studentToken;

const setupUsers = async () => {
  const User = require('../models/User');

  await request(app).post('/api/auth/register').send(TEST_ADMIN);
  await User.findOneAndUpdate({ email: TEST_ADMIN.email }, { role: 'admin' });
  const adminRes = await request(app).post('/api/auth/login').send({ email: TEST_ADMIN.email, password: TEST_ADMIN.password });
  adminToken = adminRes.body.token;

  await request(app).post('/api/auth/register').send(TEST_STUDENT);
  const studentRes = await request(app).post('/api/auth/login').send({ email: TEST_STUDENT.email, password: TEST_STUDENT.password });
  studentToken = studentRes.body.token;
};

describe('Quiz API', () => {
  beforeEach(async () => await setupUsers());

  describe('POST /api/quizzes', () => {
    it('admin should create a quiz', async () => {
      const res = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'JS Basics', description: 'JavaScript quiz', timeLimit: 10 });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Quiz created successfully');
    });

    it('student should not create a quiz', async () => {
      const res = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ title: 'JS Basics', description: 'JavaScript quiz', timeLimit: 10 });
      expect(res.status).toBe(403);
    });

    it('should reject unauthenticated request', async () => {
      const res = await request(app).post('/api/quizzes').send({ title: 'JS Basics' });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/quizzes', () => {
    it('should return all quizzes', async () => {
      await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'JS Basics', description: 'Test', timeLimit: 5 });

      const res = await request(app)
        .get('/api/quizzes')
        .set('Authorization', `Bearer ${studentToken}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('JS Basics');
    });
  });

  describe('DELETE /api/quizzes/:quizId', () => {
    it('admin should delete a quiz', async () => {
      const create = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'To Delete', description: '', timeLimit: 5 });

      const quizId = create.body.quiz._id;
      const res = await request(app)
        .delete(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Quiz deleted successfully');
    });
  });
});
