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

const report = (context, node) => context.report({
  node,
  message: errorMessage
});

module.exports = context => ({
  JSXAttribute: attribute => {
    const normalizedName = attribute.name.name.toUpperCase();
    if (normalizedName !== 'ROLE') {
      return;
    }

    const normalizedType = attribute.value === null ? 'NULL' : attribute.value.type.toUpperCase();

    // Only check literals, as we cannot enforce variables representing role types.
    // Check expression containers to determine null or undefined values.
    if (normalizedType === 'JSXEXPRESSIONCONTAINER') {
      const expressionValue = getAttributeValue(attribute);
      const isUndefinedOrNull = expressionValue === undefined || expressionValue === null;

      if (isUndefinedOrNull) {
        report(context, attribute);
      }

      return;
    } else if (normalizedType === 'NULL') {
      // Report when <div role /> -- this assumes property truthiness, which is not a valid role.
      report(context, attribute);
      return;
    } else if (normalizedType !== 'LITERAL') {
      return;
    }

    // If value is a literal.
    const normalizedValues = attribute.value.value.toUpperCase().split(" ");
    const isValid = normalizedValues.every(value => validRoleTypes.indexOf(value) > -1);

    if (isValid === false) {
      report(context, attribute);
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
