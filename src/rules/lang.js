/**
 * @fileoverview Enforce lang attribute has a valid value.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, getLiteralPropValue } from 'jsx-ast-utils';
import tags from 'language-tags';
import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';

const errorMessage = 'lang attribute must have a valid value.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/lang.md',
      description: 'Enforce lang attribute has a valid value.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXAttribute: (node) => {
        const name = propName(node);
        if (name && name.toUpperCase() !== 'LANG') {
          return;
        }

        const { parent } = node;
        const type = elementType(parent);
        if (type && type !== 'html') {
          return;
        }

        const value = getLiteralPropValue(node);

        // Don't check identifiers
        if (value === null) {
          return;
        }
        if (value === undefined) {
          context.report({
            node,
            message: errorMessage,
          });

          return;
        }

        if (tags.check(value)) {
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
