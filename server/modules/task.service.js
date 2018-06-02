const dataService = require('../modules/data.service');

const service = {};

service.addTask = async (task) => {
  const newKey = dataService.generateKey('Task');
  const entity = {
    key: newKey,
    data: task
  };

  const result =  await dataService.create(entity);

  return result.Error ? result : task;
};

service.getTasks = async () => {
  const result = await dataService.readAll();

  return result.Error ? result : result[0];
};

module.exports = service;