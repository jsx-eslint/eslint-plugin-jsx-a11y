/**
 * @fileoverview Enforce scope prop is only used on <th> elements.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, elementType } from 'jsx-ast-utils';

const errorMessage = 'The scope prop can only be used on <th> elements.';

module.exports = context => ({
  JSXAttribute: node => {
    const name = propName(node);
    if (name && name.toUpperCase() !== 'SCOPE') {
      return;
    }

    const { parent } = node;
    const type = elementType(parent);
    if (type && type.toUpperCase() === 'TH') {
      return;
    }

    context.report({
      node,
      message: errorMessage,
    });
  },
});

module.exports.schema = [
  { type: 'object' },
];
