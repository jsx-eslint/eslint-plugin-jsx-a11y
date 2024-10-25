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

export default {
  validityCheck,
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-proptypes.md',
      description: 'Enforce ARIA state and property values are valid.',
    },
    messages: {
      boolean: 'The value for {{name}} must be a boolean.',
      id: 'The value for {{name}} must be a string that represents a DOM element ID',
      idlist: 'The value for {{name}} must be a list of strings that represent DOM element IDs (idlist)',
      integer: 'The value for {{name}} must be a integer.',
      number: 'The value for {{name}} must be a number.',
      string: 'The value for {{name}} must be a string.',
      token: 'The value for {{name}} must be a single token from the following: {{permittedValues}}.',
      tokenlist: 'The value for {{name}} must be a list of one or more tokens from the following: {{permittedValues}}.',
      tristate: 'The value for {{name}} must be a boolean or the string "mixed".',
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
        data: {
          name,
          permittedValues,
        },
        messageId: permittedType,
        node: attribute,
      });
    },
  }),
};
