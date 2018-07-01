const dataService = require('../modules/data.service');
const uuid = require('uuid/v1');

const service = {};

service.getUser = async (userId) => {
    const result = await dataService.readUser(userId);
  
    return result.Error ? result : result[0];
};

service.getOrAddUser = async (user) => {
    user_profile = await service.getUser(user.userId);
    
    if(user_profile[0] === undefined){
        user.id = uuid();
        const entity = {
          key: dataService.getDataStoreKey('User', user.id),
          data: user
        };
        const result = await dataService.create(entity);
        
        return result.Error ? result : user;
    } else {
        return user_profile[0];
    }
};

module.exports = service;