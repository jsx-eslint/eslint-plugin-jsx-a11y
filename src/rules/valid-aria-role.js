/**
 * @fileoverview Enforce aria role attribute is valid.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import roles from '../util/attributes/role';
import { getLiteralAttributeValue } from '../util/getAttributeValue';

const errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';

module.exports = context => ({
  JSXAttribute: attribute => {
    const normalizedName = attribute.name.name.toUpperCase();
    if (normalizedName !== 'ROLE') {
      return;
    }

    const value = getLiteralAttributeValue(attribute);

    // If value is undefined, then the role attribute will be dropped in the DOM.
    // If value is null, then getLiteralAttributeValue is telling us that the value isn't in the form of a literal.
    if (value === undefined || value === null) {
      return;
    }

    const normalizedValues = String(value).toUpperCase().split(' ');
    const validRoles = Object.keys(roles).filter(role => roles[role].abstract === false);
    const isValid = normalizedValues.every(value => validRoles.indexOf(value) > -1);

    if (isValid === true) {
      return;
    }

    context.report({
      node: attribute,
      message: errorMessage
    });
  }
});

module.exports.schema = [
  { type: 'object' }
];
