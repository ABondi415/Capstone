describe('Chatbot Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let chatbotService;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'info');

    chatbotService = require('../modules/chatbot.service');
  });

  afterAll(() => {
    sandbox.restore();
  });

  it('should initialize', () => {
    expect(chatbotService).toBeDefined();
  });

  it('should generate a session id', () => {
    const id = chatbotService.generateSessionId();

    expect(id).toBeDefined();
    expect(id).toHaveLength(36);
  });

  it('should send "hello" to the chatbot and recieve a response', async () => {
    expect.assertions(1);

    const id = chatbotService.generateSessionId();
    const message = 'hello';

    const response = await chatbotService.sendMessage(message, id);

    expect(response).toBeDefined();
  });

});