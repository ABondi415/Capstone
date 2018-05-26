'use strict';

const express = require('express');
const moment = require('moment');

const router = express.Router();

const logger = require('../modules/logger.service');
const taskService = require('../modules/task.service');

router.get('/healthCheck', (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('health check', loggingId, timestamp);

  next({ response: 'success' });
});

router.post('/task', (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Adding new task', loggingId, timestamp);

  const task = request.body;

  taskService.addTask(task);

  next({ response: 'success' });
});

module.exports = router;