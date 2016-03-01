/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = 'onBlur must be used instead of onchange, ' +
  'unless absolutely necessary and it causes no negative consequences ' +
  'for keyboard only or screen reader users.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const hasOnChange = hasAttribute(node.attributes, 'onChange');
    const hasOnBlur = hasAttribute(node.attributes, 'onBlur');

    if (Boolean(hasOnChange) === true && hasOnBlur === false) {
      context.report({
        node,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
