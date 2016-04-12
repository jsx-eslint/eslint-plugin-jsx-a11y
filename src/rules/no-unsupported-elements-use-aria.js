/**
 * @fileoverview Enforce that elements that do not support ARIA roles, states and properties do not have those attributes.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import DOM from '../util/attributes/DOM';
import ARIA from '../util/attributes/ARIA';
import hasAttribute from '../util/hasAttribute';
import getNodeType from '../util/getNodeType';

const errorMessage = 'This element does not support ARIA roles, states and properties.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const nodeType = getNodeType(node);
    const nodeAttrs = DOM[nodeType.toUpperCase()];
    const isReservedNodeType = nodeAttrs && nodeAttrs.reserved || false;

    // If it's not reserved, then it can have ARIA-* roles, states, and properties
    if (isReservedNodeType === false) {
      return;
    }

    // Check if it has role attribute;
    const hasRole = hasAttribute(node.attributes, 'role');
    const hasAria = Object.keys(ARIA).some(prop => hasAttribute(node.attributes, prop.toLowerCase()));

    if (hasRole || hasAria) {
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
