/* eslint-env mocha */
import assert from 'assert';
import { generateObjSchema, arraySchema } from '../../../src/util/schemas';

describe('schemas', () => {
  it('should generate an object schema with correct properties', () => {
    const schema = generateObjSchema({
      foo: 'bar',
      baz: arraySchema,
    });
    const properties = schema.properties || {};

    assert.deepEqual(properties.foo, 'bar');
    assert.deepEqual(properties.baz.type, 'array');
  });
});
