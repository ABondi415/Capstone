'use strict';

describe('Router', () => {
  const sinon = require('sinon');
  const express = require('express');
  const supertest = require('supertest');

  let sandbox;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'info');
  });

  afterAll(() => {
    sandbox.restore();
  });

  let request;

  beforeEach(() => {
    const app = express();
    const api = require('../routes/api');
    app.use('/api', api);
    request = supertest(app);
  });

  it('should GET /healthCheck', () => {
    request
      .get('/api/healthCheck')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {});
  });
});