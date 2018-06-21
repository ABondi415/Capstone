const dialogflow = require('dialogflow');
const uuid = require('uuid/v1');

const appEnvService = require('../modules/app-env.service');
const taskService = require('../modules/task.service');

const sessionClient = new dialogflow.SessionsClient();
const languageCode = 'en-US';

const service = {};

service.errorMessage = 'I\'m sorry, I appear to be having technical difficulties.';

service.generateSessionId = () => {
  return uuid();
};

service.handleIncomingMessage = async (message) => {
  const action = message.queryResult.intent.displayName;

  let actionHandler = null;
  let actionResponseMessage = null;

  switch (action) {
    case 'ADD_TASK':
      actionHandler = service.addTask;
  }

  try {
    actionResponseMessage = await actionHandler(message);
  }
  catch (ex) {
    actionResponseMessage = service.errorMessage;
  }

  return service.generateChatbotResponse(actionResponseMessage);
};

service.addTask = async (message) => {
  const task = {
    'id': null,
    'dueDate': null,
    'description': message.queryResult.parameters.taskDescription,
    'selected': false,
    'userId': null
  };

  const result = await taskService.addTask(task);

  return result.Error ? service.errorMessage : 'Ok, you\'re all set!';
};

service.generateChatbotResponse = (responseMessage) => {
  const responseBody = {
    'fulfillmentText': responseMessage,
    'payload': {
      'google': {
        'expectUserResponse': false,
        'richResponse': {
          'items': [
            {
              'simpleResponse': {
                'textToSpeech': responseMessage
              }
            }
          ]
        }
      }
    }
  };

  return responseBody;
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