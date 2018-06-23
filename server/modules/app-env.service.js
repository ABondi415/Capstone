const path = require('path');
const fs = require('fs');

const logger = require('./logger.service');

const service = {};

service.getVariable = (key) => {
  if (!key) return null;

  return process.env[key] || null;
};

function init() {
  const pathToLocalEnvVariables = path.resolve(__dirname, '../../env-local.env');
  if (fs.existsSync(pathToLocalEnvVariables)) {
    logger.info('Loading local environment variables.');
    require('dotenv').config({ path: pathToLocalEnvVariables });
  }
}

init();

module.exports = service;