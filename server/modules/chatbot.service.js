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

service.getChatbotActionHandler = (actionText) => {
  switch (actionText) {
    case 'ADD_TASK':
      return service.addTask;
    case 'HOW_MANY_TASKS':
      return service.getTaskCount;
    case 'HOW_MANY_ACTIVE_TASKS':
      return service.getActiveTaskCount;
    case 'NEXT_TASK':
      return service.getNextTask;
  }

  return null;
};

service.addTask = async (message) => {
  const userInfoContext = message.queryResult.outputContexts.find(c => c.name.endsWith('userinfo'));
  if (!userInfoContext)
    return 'No user info context set';

  const task = {
    'description': message.queryResult.parameters.taskDescription,
    'dueDate': null,
    'id': null,
    'selected': false,
    'sprite': null,
    'taskCompleted': false,
    'taskDetail': '',
    'taskPriority': false,
    'userId': userInfoContext.parameters.userId,
    'voiceReminder': false
  };

  const result = await taskService.addTask(task);

  return result.Error ? service.errorMessage : 'Ok, you\'re all set!';
};

service.getTaskCount = async (message) => {
  const userInfoContext = message.queryResult.outputContexts.find(c => c.name.endsWith('userinfo'));
  if (!userInfoContext)
    return 'No user info context set';
  
  const result = await taskService.getUserTasks(userInfoContext.parameters.userId);

  if (result.Error)
    return service.errorMessage;
  
  if (result.length === 1)
    return 'You have 1 task';
  
  return `You have ${result.length} total tasks`;
};

service.getActiveTaskCount = async (message) => {
  const userInfoContext = message.queryResult.outputContexts.find(c => c.name.endsWith('userinfo'));
  if (!userInfoContext)
    return 'No user info context set';
  
  const result = await taskService.getUserTasks(userInfoContext.parameters.userId);

  if (result.Error)
    return service.errorMessage;
  
  const activeTasks = result.filter(task => task.taskCompleted === false);
  
  if (activeTasks.length === 1)
    return 'You have 1 active task';
  
  return `You have ${activeTasks.length} active tasks`;
};

service.getNextTask = async (message) => {
  const userInfoContext = message.queryResult.outputContexts.find(c => c.name.endsWith('userinfo'));
  if (!userInfoContext)
    return 'No user info context set';
  
  const result = await taskService.getUserTasks(userInfoContext.parameters.userId);

  if (result.Error)
    return service.errorMessage;
  
  const activeTasks = result.filter(task => task.taskCompleted === false);
  
  if (activeTasks.length === 0)
    return 'You don\'t have any active tasks.';
  
  if (activeTasks.length === 1)
    return activeTasks[0].dueDate ?
      `Your next task is: ${activeTasks[0].description}, due on ${activeTasks[0].dueDate}.` :
      `Your next task is: ${activeTasks[0].description}`;

  var sortedTasks = activeTasks.filter(t => t.dueDate).sort((a, b) => { return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf(); });
  return sortedTasks.length > 0 ?
    `Your next task is: ${sortedTasks[0].description}, due on ${sortedTasks[0].dueDate}.` :
    `Your next task is: ${activeTasks[0].description}.`;
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

service.createChatbotSession = async (user) => {
  if (!user)
    return null;

  const projectId = appEnvService.getVariable('PROJECT_ID');
  const sessionId = service.generateSessionId();
  const contextId = 'userInfo';

  const sessionPath = contextsClient.sessionPath(projectId, sessionId);
  const contextPath = contextsClient.contextPath(projectId, sessionId, contextId);

  const request = {
    parent: sessionPath,
    context: {
      name: contextPath,
      lifespanCount: 5,
      parameters: structjson.jsonToStructProto(user)
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