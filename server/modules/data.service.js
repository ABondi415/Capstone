'use strict';

const Datastore = require('@google-cloud/datastore');

const logger = require('../modules/logger.service');
const appEnvService = require('../modules/app-env.service');

const ds = new Datastore({
  projectId: appEnvService.getVariable('PROJECT_ID'),
});

const service = {};

// Generate a unique identifier based on the entities kind
service.generateKey = (kind) => {
  return ds.key(kind);
};

service.create = async (entity) => {
  try {
    const result = await ds.insert(entity);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore create error: ${err}`);
    return { Error: err };
  }
};

service.read = async (key) => {
  try {
    const result = await ds.get(key);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore read error: ${err}`);
    return { Error: err };
  }
};

service.update = async (entity) => {
  try {
    const result = await ds.update(entity);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore update error: ${err}`);
    return { Error: err };
  }
};

service.delete = async (key) => {
  try {
    const result = await ds.delete(key);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore delete error: ${err}`);
    return { Error: err };
  }
};

service.readAll = async () => {
  try {
    const query = ds.createQuery('Task');
    return ds.runQuery(query);
  }
  catch (err) {
    logger.error(`gcloud datastore readAll error: ${err}`);
    return { Error: err };
  }
};

module.exports = service;