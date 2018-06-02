'use strict';

describe('Logger Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let infoStub;
  let errorStub;
  let loggerService;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    loggerService = require('../modules/logger.service');
  });

  beforeEach(() => {
    infoStub = sandbox.stub(console, 'info');
    errorStub = sandbox.stub(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should initialize', () => {
    expect(loggerService).toBeDefined();
  });

  it('should generate an id', () => {
    const id = loggerService.generateId();

    expect(id).toBeDefined();
    expect(id).toHaveLength(32);
  });

  it('should log an info message with given id and timestamp', () => {
    const id = '1234';
    const ts = '2018-01-01';
    const message = 'test';

    const consoleOutput = `${ts} ${id}: ${message}`;

    loggerService.info(message, id, ts);

    expect(infoStub.calledOnce).toBeTruthy();
    expect(infoStub.calledWithExactly(consoleOutput)).toBeTruthy();
    expect(errorStub.notCalled).toBeTruthy();
  });

  it('should log an info message with new id and timestamp', () => {
    const message = 'test';

    loggerService.info(message);

    expect(infoStub.calledOnce).toBeTruthy();
    expect(infoStub.getCall(0).args[0].endsWith(message)).toBeTruthy();

    // Length of Guid (32) + Length of Timestamp (22) + Length of message (4) + spaces & colon (3) = 61
    expect(infoStub.getCall(0).args[0]).toHaveLength(61);
    expect(errorStub.notCalled).toBeTruthy();
  });

  it('should log an error message with given id and timestamp', () => {
    const id = '1234';
    const ts = '2018-01-01';
    const message = 'test';

    const consoleOutput = `${ts} ${id}: ${message}`;

    loggerService.error(message, id, ts);

    expect(errorStub.calledOnce).toBeTruthy();
    expect(errorStub.calledWithExactly(consoleOutput)).toBeTruthy();
    expect(infoStub.notCalled).toBeTruthy();
  });

  it('should log an error message with new id and timestamp', () => {
    const message = 'test';

    loggerService.error(message);

    expect(errorStub.calledOnce).toBeTruthy();
    expect(errorStub.getCall(0).args[0].endsWith(message)).toBeTruthy();

    // Length of Guid (32) + Length of Timestamp (22) + Length of message (4) + spaces & colon (3) = 61
    expect(errorStub.getCall(0).args[0]).toHaveLength(61);
    expect(infoStub.notCalled).toBeTruthy();
  });
});