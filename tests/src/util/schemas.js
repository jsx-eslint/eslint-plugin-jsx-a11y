/* eslint-env mocha */
import assert from 'assert';
import * as schemas from '../../../src/util/schemas';

describe('schemas', () => {
  it('should export only schemas with type `Object`', () => {
    const actual = Object.keys(schemas)
      .every(schema => schemas[schema] && schemas[schema].type === 'object');
    const expected = true;

    assert.deepEqual(actual, expected);
  });
});
