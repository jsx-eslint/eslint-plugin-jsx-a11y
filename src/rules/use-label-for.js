/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = 'Form controls using a label to identify them must be ' +
  'programmatically associated with the control using htmlFor';

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = node.name.name;
    if (type.toUpperCase() !== 'LABEL') {
      return;
    }

    const hasHtmlForAttr = hasAttribute(node.attributes, 'htmlFor');

    if (hasHtmlForAttr === false) {
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
