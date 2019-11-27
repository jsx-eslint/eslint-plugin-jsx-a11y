/**
 * @fileoverview Enforce ARIA state and property values are valid.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { aria } from 'aria-query';
import { getLiteralPropValue, getPropValue, propName } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = (name, type, permittedValues) => {
  switch (type) {
    case 'tristate':
      return `The value for ${name} must be a boolean or the string "mixed".`;
    case 'token':
      return `The value for ${name} must be a single token from the following: ${permittedValues}.`;
    case 'tokenlist':
      return `The value for ${name} must be a list of one or more \
tokens from the following: ${permittedValues}.`;
    case 'idlist':
      return `The value for ${name} must be a list of strings that represent DOM element IDs (idlist)`;
    case 'id':
      return `The value for ${name} must be a string that represents a DOM element ID`;
    case 'boolean':
    case 'string':
    case 'integer':
    case 'number':
    default:
      return `The value for ${name} must be a ${type}.`;
  }
};

const validityCheck = (value, expectedType, permittedValues) => {
  switch (expectedType) {
    case 'boolean':
      return typeof value === 'boolean';
    case 'string':
    case 'id':
      return typeof value === 'string';
    case 'tristate':
      return typeof value === 'boolean' || value === 'mixed';
    case 'integer':
    case 'number':
      // Booleans resolve to 0/1 values so hard check that it's not first.
      // eslint-disable-next-line no-restricted-globals
      return typeof value !== 'boolean' && isNaN(Number(value)) === false;
    case 'token':
      return permittedValues.indexOf(typeof value === 'string' ? value.toLowerCase() : value) > -1;
    case 'idlist':
      return typeof value === 'string'
        && value.split(' ').every((token) => validityCheck(token, 'id', []));
    case 'tokenlist':
      return typeof value === 'string'
        && value.split(' ').every((token) => permittedValues.indexOf(token.toLowerCase()) > -1);
    default:
      return false;
  }
};

const schema = generateObjSchema();

module.exports = {
  validityCheck,
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-proptypes.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      const name = propName(attribute);
      const normalizedName = name.toLowerCase();

      // Not a valid aria-* state or property.
      if (normalizedName.indexOf('aria-') !== 0 || aria.get(normalizedName) === undefined) {
        return;
      }

      // Ignore the attribute if its value is null or undefined.
      if (getPropValue(attribute) == null) return;

      const value = getLiteralPropValue(attribute);

      // Ignore the attribute if its value is not a literal.
      if (value === null) {
        return;
      }

      // These are the attributes of the property/state to check against.
      const attributes = aria.get(normalizedName);
      const permittedType = attributes.type;
      const allowUndefined = attributes.allowUndefined || false;
      const permittedValues = attributes.values || [];

      const isValid = validityCheck(value, permittedType, permittedValues) || (allowUndefined && value === undefined);

      if (isValid) {
        return;
      }

      context.report({
        node: attribute,
        message: errorMessage(name, permittedType, permittedValues),
      });
    },
  }),
};
