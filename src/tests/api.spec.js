describe('Router', () => {
  const express = require('express');
  const supertest = require('supertest');

  let request;

  beforeEach(() => {
    let app = express();
    let api = require('../routes/api');
    app.use('/api', api);
    request = supertest(app);
  });

  it('should GET /healthCheck', () => {
    request
      .get('/api/healthCheck')
      .expect('Content-Type', 'application/json')
      .expect(200);
  });
});