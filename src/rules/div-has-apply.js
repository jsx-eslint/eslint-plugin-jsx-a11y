/**
 * @fileoverview check if div has apply text
 * @author Felicia
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
// import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasApplyText';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage = 'Div should not have text apply. Use button native HTML element instead.';

const headings = [
  'div',
];

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = headings.concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'div*' elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }
      if (hasAccessibleChild(node.parent)) {
        return;
      }
      if (isHiddenFromScreenReader(nodeType, node.attributes)) {
        return;
      }
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
