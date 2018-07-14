const dialogflow = require('dialogflow');
const uuid = require('uuid/v1');

const appEnvService = require('./app-env.service');
const taskService = require('./task.service');
const structjson = require('./google/structjson');

const sessionsClient = new dialogflow.v2.SessionsClient();
const contextsClient = new dialogflow.v2.ContextsClient();
const languageCode = 'en-US';

const service = {};

service.errorMessage = 'I\'m sorry, I appear to be having technical difficulties.';

service.generateSessionId = () => {
  return uuid();
};

service.getChatbotActionHandler = (actionText) => {
  switch (actionText) {
    case 'ADD_TASK':
      return service.addTask;
  }

  return null;
};

service.handleIncomingMessage = async (message) => {
  const actionText = message.queryResult.intent.displayName;
  const actionHandler = service.getChatbotActionHandler(actionText);

  if (!actionHandler) return null;

  let actionResponseMessage = null;

  try {
    actionResponseMessage = await actionHandler(message);
  }
  catch (ex) {
    actionResponseMessage = service.errorMessage;
  }

  return service.generateChatbotResponse(actionResponseMessage);
};

service.addTask = async (message) => {
  const userIdContext = message.queryResult.outputContexts.find(c => c.name.endsWith('userid'));
  if (!userIdContext)
    return 'No user id context set';

  const task = {
    'description': message.queryResult.parameters.taskDescription,
    'dueDate': null,
    'id': null,
    'selected': false,
    'sprite': null,
    'taskCompleted': false,
    'taskDetail': '',
    'taskPriority': false,
    'userId': userIdContext.parameters.value,
    'voiceReminder': false
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

service.createChatbotSession = async (userId) => {
  if (!userId)
    return null;

  const projectId = appEnvService.getVariable('PROJECT_ID');
  const sessionId = service.generateSessionId();
  const contextId = 'userId';

  const sessionPath = contextsClient.sessionPath(projectId, sessionId);
  const contextPath = contextsClient.contextPath(projectId, sessionId, contextId);

  const request = {
    parent: sessionPath,
    context: {
      name: contextPath,
      lifespanCount: 5,
      parameters: structjson.jsonToStructProto({ value: userId })
    }
  };

  await contextsClient.createContext(request);

  return sessionId;
};

service.sendMessage = async (message, sessionId) => {
  if (!message)
    return null;
  
  if (!sessionId)
    sessionId = service.generateSessionId();

  const projectId = appEnvService.getVariable('PROJECT_ID');
  const sessionPath = sessionsClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionsClient.detectIntent(request);
  return {
    body: responses[0],
    sessionId: sessionId
  };
};

module.exports = service;