import request from 'supertest';

import express from 'express';

const app = express();

app.get('/hello', (req, res) => res.status(201).json({ message: "Hello, world!"}));

describe('hello endpoint', () => {
  it('get /hello endpoint and return 200', async() => {
    console.log('first')
    const res = await request(app).get('/hello')
    expect(res.statusCode).toBe(200)
  });
});
