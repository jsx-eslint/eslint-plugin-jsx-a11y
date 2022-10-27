/**
 * @fileoverview Enforce scope prop is only used on <th> elements.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import { propName } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';

const errorMessage = 'The scope prop can only be used on <th> elements.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/scope.md',
      description: 'Enforce `scope` prop is only used on `<th>` elements.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXAttribute: (node) => {
        const name = propName(node);
        if (name && name.toUpperCase() !== 'SCOPE') {
          return;
        }

        const { parent } = node;
        const tagName = elementType(parent);

        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        if (!dom.has(tagName)) {
          return;
        }
        if (tagName && tagName.toUpperCase() === 'TH') {
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
