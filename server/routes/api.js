'use strict';

const express = require('express');
const moment = require('moment');

const router = express.Router();

const logger = require('../modules/logger.service');
const taskService = require('../modules/task.service');
const userService = require('../modules/user.service');
const chatbotService = require('../modules/chatbot.service');

router.get('/healthCheck', (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('health check', loggingId, timestamp);

  next({ response: 'success' });
});

router.post('/chatbot', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Incoming chatbot webhook message', loggingId, timestamp);

  const incomingMessage = request.body;
  const chatbotResponse = await chatbotService.handleIncomingMessage(incomingMessage);

  next(chatbotResponse);
});

router.post('/task', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Adding new task', loggingId, timestamp);

  const task = request.body;

  const result = await taskService.addTask(task);

  next(result);
});

router.delete('/task/:id', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Deleting task', loggingId, timestamp);

  const id = request.params.id;

  const result = await taskService.deleteTask(id);

  next(result);
});

router.get('/task', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Retrieving all tasks', loggingId, timestamp);

  const result = await taskService.getTasks();

  next(result);
});

router.get('/task/:id', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Retrieving ONE task', loggingId, timestamp);

  const id = request.params.id;

  const result = await taskService.getOneTask(id);

  next(result);
});

router.get('/my-tasks', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Retrieving all of user\'s tasks', loggingId, timestamp);

  const result = await taskService.getUserTasks(request.query.userId);

  next(result);
});

router.put('/task', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Updating a task', loggingId, timestamp);

  const task = request.body;

  const result = await taskService.updateTask(task);

  next(result);
});

router.post('/user', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  
  logger.info('Getting or creating user', loggingId, timestamp);

  const user = request.body;
  const result = await userService.getOrAddUser(user);

  next(result);
});

router.put('/user', async (request, response, next) => {
  const loggingId = logger.generateId();
  const timestamp = moment().format(logger.timestampFormat);
  logger.info('Updating a user', loggingId, timestamp);

  const user = request.body;

  const result = await userService.updateUser(user);

  next(result);
});


module.exports = router;