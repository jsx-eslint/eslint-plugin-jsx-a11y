/**
 * @fileoverview Enforce tabIndex value is not greater than zero.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getLiteralAttributeValue } from '../util/getAttributeValue';

const errorMessage = 'Avoid positive integer values for tabIndex.';

module.exports = context => ({
  JSXAttribute: attribute => {
    const name = attribute.name.name;
    const normalizedName = name.toUpperCase();

    // Check if tabIndex is the attribute
    if (normalizedName !== 'TABINDEX') {
      return;
    }

    // Only check literals because we can't infer values from certain expressions.
    const value = Number(getLiteralAttributeValue(attribute));

    if (isNaN(value) || value <= 0) {
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
