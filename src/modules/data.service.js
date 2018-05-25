'use strict';

const Datastore = require('@google-cloud/datastore');

const logger = require('../modules/logger.service');

const ds = new Datastore({
  projectId: 'penn-state-capstone',
});

let service = {};

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
  }
};

service.read = async (key) => {
  try {
    const result = await ds.get(key);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore read error: ${err}`);
  }
};

service.update = async (entity) => {
  try {
    const result = await ds.update(entity);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore update error: ${err}`);
  }
};

service.delete = async (key) => {
  try {
    const result = await ds.delete(key);
    return result;
  }
  catch (err) {
    logger.error(`gcloud datastore delete error: ${err}`);
  }
}

module.exports = service;