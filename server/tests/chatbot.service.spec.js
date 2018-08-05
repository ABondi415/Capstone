describe('Chatbot Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let chatbotService;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'info');

    chatbotService = require('../modules/chatbot.service');
    jest.mock('../modules/task.service', () => ({
      addTask: jest.fn().mockResolvedValue({})
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
    sandbox.restore();
  });

  it('should initialize', () => {
    expect(chatbotService).toBeDefined();
    expect(chatbotService.errorMessage).toBeDefined();
  });

  it('should generate a session id', () => {
    const id = chatbotService.generateSessionId();

    expect(id).toBeDefined();
    expect(id).toHaveLength(36);
  });

  it('should generate a chatbot response', () => {
    const message = 'Test';

    const response = chatbotService.generateChatbotResponse(message);

    expect(response).toBeDefined();
    expect(response.fulfillmentText).toEqual(message);
  });

  it('should return null for invalid action text', () => {
    const actionText = 'test';

    const response = chatbotService.getChatbotActionHandler(actionText);

    expect(response).toBeNull();
  });

  it('should return addTask actionHandler for ADD_TASK action text', () => {
    const actionText = 'ADD_TASK';

    const response = chatbotService.getChatbotActionHandler(actionText);

    expect(response).toBeDefined();
  });

  it('should add a task', async () => {
    const message = {
      'queryResult': {
        'parameters': {
          'taskDescription': 'test'
        },
        'outputContexts': [
          {
            'lifespanCount': 5,
            'name': 'projects/penn-state-capstone/agent/sessions/b0cfde40-983d-11e8-a226-4167599c7105/contexts/userinfo',
            'parameters': {
              'emailAddress': 'testuser@test.com',
              'firstName': 'Test',
              'id': '12345',
              'lastName': 'User',
              'score': 0,
              'taskDescription': 'Test task',
              'taskDescription.original': 'Test task',
              'userId': '12345'
            }
          }
        ]
      }
    };

    const result = await chatbotService.addTask(message);

    expect(result).toEqual('Ok, you\'re all set!');
  });

  it('should handle incoming message', async () => {
    const message = {
      'queryResult': {
        'intent': {
          'displayName': 'ADD_TASK'
        },
        'parameters': {
          'taskDescription': 'test task'
        },
        'outputContexts': [
          {
            'lifespanCount': 5,
            'name': 'projects/penn-state-capstone/agent/sessions/b0cfde40-983d-11e8-a226-4167599c7105/contexts/userinfo',
            'parameters': {
              'emailAddress': 'testuser@test.com',
              'firstName': 'Test',
              'id': '12345',
              'lastName': 'User',
              'score': 0,
              'taskDescription': 'Test task',
              'taskDescription.original': 'Test task',
              'userId': '12345'
            }
          }
        ]
      }
    };

    const expectedResult = {
      'fulfillmentText': 'Ok, you\'re all set!',
      'payload': {
        'google': {
          'expectUserResponse': false,
          'richResponse': {
            'items': [
              {
                'simpleResponse': {
                  'textToSpeech': 'Ok, you\'re all set!'
                }
              }
            ]
          }
        }
      }
    };

    const result = await chatbotService.handleIncomingMessage(message);

    expect(result).toEqual(expectedResult);
  });

  it('should send "hello" to the chatbot and recieve a response', async () => {
    expect.assertions(1);

    const id = chatbotService.generateSessionId();
    const message = 'hello';

    const response = await chatbotService.sendMessage(message, id);

    expect(response).toBeDefined();
  });

});