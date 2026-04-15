const request = require('supertest');
const app = require('../app');
const { connect, disconnect, clear } = require('./testDb');

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await disconnect());

let studentToken, studentId, quizId, questionId;

const setup = async () => {
  const User = require('../models/User');

  // Admin setup
  await request(app).post('/api/auth/register').send({ name: 'Admin', email: 'admin@test.com', password: 'pass123' });
  await User.findOneAndUpdate({ email: 'admin@test.com' }, { role: 'admin' });
  const adminRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'pass123' });
  const adminToken = adminRes.body.token;

  // Student setup
  await request(app).post('/api/auth/register').send({ name: 'Student', email: 'student@test.com', password: 'pass123' });
  const studentRes = await request(app).post('/api/auth/login').send({ email: 'student@test.com', password: 'pass123' });
  studentToken = studentRes.body.token;
  studentId = studentRes.body.user.id;

  // Create quiz
  const quizRes = await request(app)
    .post('/api/quizzes')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ title: 'JS Quiz', description: '', timeLimit: 10 });
  quizId = quizRes.body.quiz._id;

  // Add questions
  const q1 = await request(app)
    .post('/api/questions')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ quizId, questionText: 'What is JS?', options: ['Language', 'DB', 'OS', 'Compiler'], correctAnswer: 'Language' });
  questionId = q1.body.question._id;

  await request(app)
    .post('/api/questions')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ quizId, questionText: 'JS runs on?', options: ['Browser', 'Photoshop', 'Excel', 'Word'], correctAnswer: 'Browser' });
};

describe('Result API', () => {
  beforeEach(async () => await setup());

  describe('POST /api/results/submit', () => {
    it('should calculate score correctly for all correct answers', async () => {
      const questions = await request(app)
        .get(`/api/questions/${quizId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      const answers = {};
      // We know correct answers from setup
      questions.body.forEach(q => {
        if (q.questionText === 'What is JS?') answers[q._id] = 'Language';
        if (q.questionText === 'JS runs on?') answers[q._id] = 'Browser';
      });

      const res = await request(app)
        .post('/api/results/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ quizId, answers });

      expect(res.status).toBe(200);
      expect(res.body.score).toBe(2);
      expect(res.body.totalQuestions).toBe(2);
      expect(res.body.percentage).toBe(100);
    });

    it('should return score 0 for all wrong answers', async () => {
      const questions = await request(app)
        .get(`/api/questions/${quizId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      const answers = {};
      questions.body.forEach(q => { answers[q._id] = 'DB'; });

      const res = await request(app)
        .post('/api/results/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ quizId, answers });

      expect(res.status).toBe(200);
      expect(res.body.score).toBe(0);
      expect(res.body.percentage).toBe(0);
    });

    it('should handle partial correct answers', async () => {
      const questions = await request(app)
        .get(`/api/questions/${quizId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      const answers = {};
      questions.body.forEach(q => {
        if (q.questionText === 'What is JS?') answers[q._id] = 'Language'; // correct
        if (q.questionText === 'JS runs on?') answers[q._id] = 'Excel';    // wrong
      });

      const res = await request(app)
        .post('/api/results/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ quizId, answers });

      expect(res.body.score).toBe(1);
      expect(res.body.percentage).toBe(50);
    });
  });

  describe('GET /api/results/user/:userId', () => {
    it('should return user results after submission', async () => {
      const questions = await request(app)
        .get(`/api/questions/${quizId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      const answers = {};
      questions.body.forEach(q => { answers[q._id] = 'Language'; });

      await request(app)
        .post('/api/results/submit')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ quizId, answers });

      const res = await request(app)
        .get(`/api/results/user/${studentId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].quizId.title).toBe('JS Quiz');
    });
  });
});
