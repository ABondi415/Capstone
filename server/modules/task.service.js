const dataService = require('../modules/data.service');

const service = {};

service.addTask = (task) => {
  const newKey = dataService.generateKey('Task');
  const entity = {
    key: newKey,
    data: task
  };

  dataService.create(entity);
};

service.getTasks = () => {
  return dataService.readAll();
}

module.exports = service;