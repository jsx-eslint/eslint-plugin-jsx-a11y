/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import ariaAttributes from '../util/attributes/ARIA';

const errorMessage = name => `${name}: This attribute is an invalid ARIA attribute.`;

module.exports = context => ({
  JSXAttribute: attribute => {
    const name = attribute.name.name;
    const normalizedName = name.toUpperCase();

    // `aria` needs to be prefix of property.
    if (normalizedName.indexOf('ARIA-') !== 0) {
      return;
    }

    const isValid = Object.keys(ariaAttributes).indexOf(normalizedName) > -1;

    if (isValid === false) {
      context.report({
        node: attribute,
        message: errorMessage(name)
      });
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
