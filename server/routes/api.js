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

router.post('/task', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Adding new task', loggingId, timestamp);

  const task = request.body;

  const result = await taskService.addTask(task);

  next(result);
});

router.get('/task', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Retrieving all tasks', loggingId, timestamp);

  const result = await taskService.getTasks();

  next(result);
});

module.exports = router;