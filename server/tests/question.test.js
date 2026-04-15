const request = require('supertest');
const app = require('../app');
const { connect, disconnect, clear } = require('./testDb');

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await disconnect());

let adminToken, quizId;

const setup = async () => {
  await request(app).post('/api/auth/register').send({ name: 'Admin', email: 'admin@test.com', password: 'pass123' });
  const User = require('../models/User');
  await User.findOneAndUpdate({ email: 'admin@test.com' }, { role: 'admin' });
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'pass123' });
  adminToken = res.body.token;

  const quizRes = await request(app)
    .post('/api/quizzes')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ title: 'JS Quiz', description: 'Test', timeLimit: 10 });
  quizId = quizRes.body.quiz._id;
};

describe('Question API', () => {
  beforeEach(async () => await setup());

  const questionPayload = () => ({
    quizId,
    questionText: 'What is JavaScript?',
    options: ['Language', 'Database', 'OS', 'Compiler'],
    correctAnswer: 'Language',
  });

  describe('POST /api/questions', () => {
    it('admin should add a question', async () => {
      const res = await request(app)
        .post('/api/questions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(questionPayload());
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Question added successfully');
    });

    it('should increment quiz totalQuestions', async () => {
      await request(app)
        .post('/api/questions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(questionPayload());

      const quizRes = await request(app)
        .get(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(quizRes.body.totalQuestions).toBe(1);
    });
  });

  describe('GET /api/questions/:quizId', () => {
    it('should return questions without correctAnswer', async () => {
      await request(app)
        .post('/api/questions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(questionPayload());

      const res = await request(app)
        .get(`/api/questions/${quizId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].correctAnswer).toBeUndefined();
    });
  });
});
