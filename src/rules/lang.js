/**
 * @fileoverview Enforce lang attribute has a valid value.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, elementType, getLiteralPropValue } from 'jsx-ast-utils';
import tags from 'language-tags';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'lang attribute must have a valid value.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/lang.md',
    },
    schema: [schema],
  },

  create: (context) => ({
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
  }),
};
