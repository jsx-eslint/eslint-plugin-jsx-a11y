/**
 * @fileoverview Enforce heading (h1, h2, etc) elements contain accessible content.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { generateObjSchema, arraySchema } from '../util/schemas';
import getElementType from '../util/getElementType';
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

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/heading-has-content.md',
      description: 'Enforce heading (`h1`, `h2`, etc) elements contain accessible content.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const options = context.options[0] || {};
        const componentOptions = options.components || [];
        const typeCheck = headings.concat(componentOptions);
        const nodeType = elementType(node);

        // Only check 'h*' elements and custom types.
        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        }
        if (hasAccessibleChild(node.parent, elementType)) {
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
    };
  },
};
