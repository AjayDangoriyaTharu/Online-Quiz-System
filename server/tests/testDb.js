process.env.JWT_SECRET          = 'test_jwt_secret';
process.env.ADMIN_SECRET        = 'test_admin_secret';
process.env.NODE_ENV            = 'test';
process.env.TEST_ADMIN_EMAIL    = 'admin@test.com';
process.env.TEST_ADMIN_PASS     = 'pass123';
process.env.TEST_STUDENT_EMAIL  = 'student@test.com';
process.env.TEST_STUDENT_PASS   = 'pass123';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = { connect, disconnect, clear };
