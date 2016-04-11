/**
 * @fileoverview Enforce ARIA state and property values are valid.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import ariaAttributes from '../util/ariaAttributes';
import { getLiteralAttributeValue } from '../util/getAttributeValue';

const errorMessage = (name, type) => `${name} must be of type ${type}.`;

const validityCheck = (value, expectedType, tokens) => {
  switch (expectedType) {
    case 'boolean':
      return typeof value === 'boolean';
    case 'string':
      return typeof value === 'string';
    case 'tristate':
      return typeof value === 'boolean' || value == 'mixed';
    case 'integer':
    case 'number':
      // Booleans resolve to 0/1 values so hard check that it's not first.
      return typeof value !== 'boolean' && isNaN(Number(value)) === false;
    case 'token':
      return typeof value === 'string' && tokens.some(token => value.toLowerCase() == token);
    case 'tokenlist':
      return typeof value === 'string' && value.split(' ').every(token => tokens.indexOf(token.toLowerCase()) > -1);
    default:
      return false;
  }
};

module.exports = context => ({
  JSXAttribute: attribute => {
    const name = attribute.name.name;
    const normalizedName = name.toUpperCase();

    // Not an aria-* state or property.
    if (normalizedName.indexOf('ARIA-') === -1) {
      return;
    }

    const value = getLiteralAttributeValue(attribute);

    // We only want to check literal prop values, so just pass if it's null.
    if (value === null) {
      return;
    }

    // These are the attributes of the property/state to check against.
    const attributes = ariaAttributes[normalizedName];
    const permittedType = attributes.value;
    const allowUndefined = attributes.allowUndefined || false;
    const tokens = attributes.tokens || [];

    const isValid = validityCheck(value, permittedType, tokens) || (allowUndefined && value === undefined);

    if (isValid) {
      return;
    }

    context.report({
      node: attribute,
      message: errorMessage(name, permittedType)
    });
  }
});

module.exports.schema = [
  { type: 'object' }
];
