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
import { hasAnyProp, elementType } from 'jsx-ast-utils';

const errorMessage = 'This element does not support ARIA roles, states and properties.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const nodeType = elementType(node);
    const nodeAttrs = DOM[nodeType];
    const isReservedNodeType = nodeAttrs && nodeAttrs.reserved || false;

    // If it's not reserved, then it can have ARIA-* roles, states, and properties
    if (isReservedNodeType === false) {
      return;
    }

    const invalidAttributes = Object.keys(ARIA).concat('ROLE');
    const hasInvalidAttribute = hasAnyProp(node.attributes, invalidAttributes);

    if (hasInvalidAttribute) {
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
