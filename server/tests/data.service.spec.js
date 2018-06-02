'use strict';

describe('Data Service', () => {
  const sinon = require('sinon');

  let sandbox;
  let dataService;

  beforeAll(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'info');

    dataService = require('../modules/data.service');
  });

  afterAll(() => {
    sandbox.restore();
  });

  it('should initialize', () => {
    expect(dataService).toBeDefined();
  });

  it('should generate key', () => {
    const kind = 'Task';
    const result = dataService.generateKey(kind);

    expect(result).toBeDefined();
    expect(result.kind).toEqual(kind);
  });

  // This violates the single purpose rule for unit tests, but I added it to provide 
  //  an example of how to use the database.  It is really more of an integration 
  //  test.
  it('should create, read, update, and delete entity', async () => {
    expect.assertions(10);

    let result = null;

    // generateKey array arguments are [kind, name]. Name is optional.
    const testKey = dataService.generateKey(['Task', 'MyTestEntity']);
    const entity = {
      key: testKey,
      data: {
        description: 'Test'
      }
    };

    // Create
    result = await dataService.create(entity);
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);

    // Read
    result = await dataService.read(testKey);
    expect(result).toBeDefined();
    expect(result[0].description).toEqual('Test');

    // Update
    entity.data.description = 'Update Test';
    result = await dataService.update(entity);
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);

    // Verify Update
    result = await dataService.read(testKey);
    expect(result).toBeDefined();
    expect(result[0].description).toEqual('Update Test');

    // Delete
    result = await dataService.delete(testKey);
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
  });
});