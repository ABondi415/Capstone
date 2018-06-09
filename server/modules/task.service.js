const dataService = require('../modules/data.service');
const uuid = require('uuid/v1');

const service = {};

service.addTask = async (task) => {
  task.id = uuid();
  const entity = {
    key: dataService.getDataStoreKey('Task', task.id),
    data: task
  };

  const result = await dataService.create(entity);

  return result.Error ? result : task;
};

service.deleteTask = async (id) => {
  const key = dataService.getDataStoreKey('Task', id);
  const result = await dataService.delete(key);

  return result.Error ? result : id;
};

service.getTasks = async () => {
  const result = await dataService.readAll();

  return result.Error ? result : result[0];
};

module.exports = service;