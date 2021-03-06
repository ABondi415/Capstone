'use strict';

const moment = require('moment');
const uuid = require('uuid/v1');

const service = {};

service.timestampFormat = 'YYYY-MM-DD HH:mm:ss:SS';

service.generateId = () => {
  return uuid().replace(/-/g, '');
};

service.info = (message, loggingId, timestamp) =>  {
  const id = loggingId || service.generateId();
  const ts = timestamp || moment().format(service.timestampFormat);
  const logMessage = `${ts} ${id}: ${message}`;

  console.info(logMessage);
};

service.error = (message, loggingId, timestamp) =>  {
  const id = loggingId || service.generateId();
  const ts = timestamp || moment().format(service.timestampFormat);
  const logMessage = `${ts} ${id}: ${message}`;

  console.error(logMessage);
};

module.exports = service;