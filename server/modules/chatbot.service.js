const appEnvService = require('../modules/app-env.service');
const dialogflow = require('dialogflow');
const uuid = require('uuid/v1');

const sessionClient = new dialogflow.SessionsClient();
const languageCode = 'en-US';

const service = {};

service.generateSessionId = () => {
  return uuid();
};

service.sendMessage = async (message, sessionId) => {
  const projectId = appEnvService.getVariable('PROJECT_ID');
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);

  return responses[0].queryResult;
};

module.exports = service;