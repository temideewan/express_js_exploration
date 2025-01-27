import request from 'supertest';
import configureApp from '../configureApplication.mjs';
import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

describe('create user and login', () => {
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

  it('should create a user', async () => {
    const response = await request(app).post('/api/users').send({
      username: 'adam123',
      password: 'password',
      displayname: 'temideewan',
    });
    expect(response.statusCode).toBe(201);
  });

  it('should log the user in and confirm auth status', async () => {
    const response = await request(app)
      .post('/api/auth')
      .send({
        username: 'adam123',
        password: 'password',
      })
      .then((res) => {
        return request(app).get('/api/auth/status').set('Cookie', res.headers['set-cookie']);
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('adam123');
    expect(response.body.displayname).toBe('temideewan');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Database connection closed');
  });
});
