/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = 'Links must not point to "#". Use a more descriptive href or use a button instead.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = node.name.name;
    // Only check img tags.
    if (type !== 'a') {
      return;
    }

    const href = hasAttribute(node.attributes, 'href');

    if (href === '#') {
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
