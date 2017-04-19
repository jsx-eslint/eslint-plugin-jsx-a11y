'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * JSON schema to accept an array of unique strings
 */
var arraySchema = exports.arraySchema = {
  type: 'array',
  items: {
    type: 'string'
  },
  uniqueItems: true,
  additionalItems: false
};

/**
 * JSON schema to accept an array of unique strings from an enumerated list.
 */
var enumArraySchema = exports.enumArraySchema = function enumArraySchema() {
  var enumeratedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return Object.assign({}, arraySchema, {
    items: {
      type: 'string',
      enum: enumeratedList
    }
  });
};

/**
 * Factory function to generate an object schema
 * with specified properties object
 */
var generateObjSchema = exports.generateObjSchema = function generateObjSchema() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'object',
    properties: properties
  };
};