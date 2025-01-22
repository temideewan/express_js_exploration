import request from 'supertest';
import configureApp from '../configureApplication.mjs';
import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

describe('/api/auth', () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect('mongodb://localhost:27017/express_tutorial_test')
      .then(() => {
        console.log('Connected to database');
      })
      .catch((err) => {
        console.error(err);
      });
    app = configureApp(mongoose);
  });
  it('should return 401 wen not logged in', async () => {
    const resp = await request(app).get('/api/auth/status');
    expect(resp.statusCode).toBe(401);
  });

  afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Database connection closed');
  })
});
