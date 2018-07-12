const dataService = require('./data.service');
const uuid = require('uuid/v1');

const service = {};

service.addMessage = async (message) => {
  message.id = uuid();
  const entity = {
    key: dataService.getDataStoreKey('Message', message.id),
    data: message
  };

  const result = await dataService.create(entity);

  return result.Error ? result : message;
};

service.getUserMessages = async (userId) => {
  const result = await dataService.readUserMessages(userId);
  return result.Error ? result : result[0];
};

module.exports = service;