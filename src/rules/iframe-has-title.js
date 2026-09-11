/**
 * @fileoverview Enforce iframe elements have a title attribute.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from 'jsx-ast-utils';
import getElementType from '../util/getElementType';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '<iframe> elements must have a unique title property.';

const accessibleNameProps = ['title', 'aria-label', 'aria-labelledby'];

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/iframe-has-title.md',
      description: 'Enforce iframe elements have a title attribute.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);

        if (type && type !== 'iframe') {
          return;
        }

        const hasAccessibleName = accessibleNameProps.some((name) => {
          const value = getPropValue(getProp(node.attributes, name));
          return value && typeof value === 'string';
        });

        if (hasAccessibleName) {
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
