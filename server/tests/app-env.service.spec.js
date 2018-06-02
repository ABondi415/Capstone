describe('App Environment Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let appEnvService;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'info');

    appEnvService = require('../modules/app-env.service');
  });

  afterAll(() => {
    sandbox.restore();
  });

  it('should initialize', () => {
    expect(appEnvService).toBeDefined();
  });

  it('should return null if no key is provided', () => {
    const key = null;

    const result = appEnvService.getVariable(key);
    expect(result).toBeNull();
  });

  it('should return null if key does not exist', () => {
    const key = 'TEST_KEY';

    const result = appEnvService.getVariable(key);
    expect(result).toBeNull();
  });

  it('should return key value if key exists', () => {
    const key = 'PROJECT_ID';
    const expectedResult = 'penn-state-capstone';

    const result = appEnvService.getVariable(key);
    expect(result).toEqual(expectedResult);
  });
});