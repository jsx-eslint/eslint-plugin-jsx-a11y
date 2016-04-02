/**
 * @fileoverview Enforce aria role attribute is valid.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import validRoleTypes from '../util/validRoleTypes';
import getAttributeValue from '../util/getAttributeValue';

const errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';

module.exports = context => ({
  JSXAttribute: attribute => {
    const normalizedName = attribute.name.name.toUpperCase();
    const normalizedType = attribute.value.type.toUpperCase();

    if (normalizedName !== 'ROLE') {
      return;
    }

    // Only check literals, as we cannot enforce variables representing role types.
    // Check expression containers to determine null or undefined values.
    if (normalizedType === 'JSXEXPRESSIONCONTAINER') {
      const expressionValue = getAttributeValue(attribute);
      const isUndefinedOrNull = expressionValue === undefined || expressionValue === null;

      if (isUndefinedOrNull) {
        context.report({
          node: attribute,
          message: errorMessage
        });
      }

      return;
    } else if (normalizedType !== 'LITERAL') {
      return;
    }

    // If value is a literal.
    const normalizedValue = attribute.value.value.toUpperCase();
    const isValid = validRoleTypes.indexOf(normalizedValue) > -1;

    if (isValid === false) {
      context.report({
        node: attribute,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
