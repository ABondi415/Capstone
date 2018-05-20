'use strict';

describe('Logger Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let infoStub;
  let errorStub;
  let loggerService;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    infoStub = sandbox.stub(console, 'info');
    errorStub = sandbox.stub(console, 'error');
    loggerService = require('../modules/logger.service');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create the service', () => {
    expect(loggerService).toBeDefined();
  });

  it('should generate an id', () => {
    let id = loggerService.generateId();

    expect(id).toBeDefined();
    expect(id.length).toEqual(32);
  });

  it('should log an info message with given id and timestamp', () => {
    let id = '1234'
    let ts = '2018-01-01';
    let message = 'test';

    let consoleOutput = `${ts} ${id}: ${message}`;

    loggerService.info(message, id, ts);

    expect(infoStub.calledOnce).toBeTruthy();
    expect(infoStub.calledWithExactly(consoleOutput)).toBeTruthy();
    expect(errorStub.notCalled).toBeTruthy();
  });

  it('should log an info message with new id and timestamp', () => {
    let message = 'test';

    loggerService.info(message);

    expect(infoStub.calledOnce).toBeTruthy();
    expect(infoStub.getCall(0).args[0].endsWith(message)).toBeTruthy();

    // Length of Guid (32) + Length of Timestamp (22) + Length of message (4) + spaces & colon (3) = 61
    expect(infoStub.getCall(0).args[0].length).toEqual(61);
    expect(errorStub.notCalled).toBeTruthy();
  });

  it('should log an error message with given id and timestamp', () => {
    let id = '1234'
    let ts = '2018-01-01';
    let message = 'test';

    let consoleOutput = `${ts} ${id}: ${message}`;

    loggerService.error(message, id, ts);

    expect(errorStub.calledOnce).toBeTruthy();
    expect(errorStub.calledWithExactly(consoleOutput)).toBeTruthy();
    expect(infoStub.notCalled).toBeTruthy();
  });

  it('should log an error message with new id and timestamp', () => {
    let message = 'test';

    loggerService.error(message);

    expect(errorStub.calledOnce).toBeTruthy();
    expect(errorStub.getCall(0).args[0].endsWith(message)).toBeTruthy();

    // Length of Guid (32) + Length of Timestamp (22) + Length of message (4) + spaces & colon (3) = 61
    expect(errorStub.getCall(0).args[0].length).toEqual(61);
    expect(infoStub.notCalled).toBeTruthy();
  });
});