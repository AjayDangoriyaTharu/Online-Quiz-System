const request = require('supertest');
const app = require('../app');
const { connect, disconnect, clear } = require('./testDb');

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await disconnect());

// ── Test fixtures ─────────────────────────────────────────
const TEST_USER = {
  name:     'Test User',
  email:    'test@example.com',
  password: 'password123',
};

const WRONG_PASSWORD    = 'wrongpass';
const INVALID_PASSWORD  = 'invalid';
const NONEXISTENT_EMAIL = 'nobody@example.com';

describe('Auth API', () => {

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/auth/register').send(TEST_USER);
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should reject duplicate email', async () => {
      await request(app).post('/api/auth/register').send(TEST_USER);
      const res = await request(app).post('/api/auth/register').send(TEST_USER);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email already exists');
    });

    it('should reject missing fields', async () => {
      const res = await request(app).post('/api/auth/register').send({ email: TEST_USER.email });
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(TEST_USER);
    });

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(TEST_USER.email);
    });

    it('should reject wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: TEST_USER.email, password: WRONG_PASSWORD });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });

    it('should reject non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: NONEXISTENT_EMAIL, password: INVALID_PASSWORD });
      expect(res.status).toBe(401);
    });
  });
});
