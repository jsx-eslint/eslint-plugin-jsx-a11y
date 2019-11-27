/**
 * @fileoverview Enforce heading (h1, h2, etc) elements contain accessible content.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasAccessibleChild';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage = 'Headings must have content and the content must be accessible by a screen reader.';

const headings = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/heading-has-content.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = headings.concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'h*' elements and custom types.
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
