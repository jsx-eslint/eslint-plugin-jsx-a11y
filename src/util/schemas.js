/**
 * JSON schema to accept an array of unique strings
 */
export const arraySchema = {
  type: 'array',
  items: {
    type: 'string',
  },
  uniqueItems: true,
  additionalItems: false,
};

/**
 * JSON schema to accept an array of unique strings from an enumerated list.
 */
export const enumArraySchema = (enumeratedList = []) => Object.assign({}, arraySchema, {
  items: {
    type: 'string',
    enum: enumeratedList,
  },
});

/**
 * Factory function to generate an object schema
 * with specified properties object
 */
export const generateObjSchema = (properties = {}) => ({
  type: 'object',
  properties,
});
