/* eslint-env mocha */
import assert from 'assert';
import * as schemas from '../../../src/util/schemas';

describe('schemas', () => {
  it('should export only schemas with type `Object`', () => {
    const actual = Object.keys(schemas).every((schema) => {
      const schemaObj = schemas[schema]();
      return schemaObj && schemaObj.type === 'object';
    });
    const expected = true;

    assert.deepEqual(actual, expected);
  });
});
