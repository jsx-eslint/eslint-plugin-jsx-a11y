/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../hasAttribute';

const errorMessage = 'img elements must have an alt tag.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = node.name.name;
    if (type.toUpperCase() !== 'IMG') {
      return;
    }

    const hasAltProp = hasAttribute(node.attributes, 'alt');

    if (hasAltProp === false) {
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
