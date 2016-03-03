/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = 'img elements must have an alt tag.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = node.name.name;
    // Only check img tags.
    if (type !== 'img') {
      return;
    }

    const hasAltProp = hasAttribute(node.attributes, 'alt');

    // alt must have a value.
    if (hasAltProp === false || hasAltProp === null) {
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
