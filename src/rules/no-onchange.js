/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';

const errorMessage = 'onBlur must be used instead of onchange, ' +
  'unless absolutely necessary and it causes no negative consequences ' +
  'for keyboard only or screen reader users.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const onChange = getAttribute(node.attributes, 'onChange');
    const hasOnBlur = getAttribute(node.attributes, 'onBlur') !== undefined;

    if (onChange && !hasOnBlur) {
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
