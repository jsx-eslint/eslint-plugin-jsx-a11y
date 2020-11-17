/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'onBlur must be used instead of onchange, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users.';

const applicableTypes = [
  'select',
  'option',
];

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-onchange.md',
    },
    deprecated: true,
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const nodeType = elementType(node);

      if (applicableTypes.indexOf(nodeType) === -1) {
        return;
      }

      const onChange = getProp(node.attributes, 'onChange');
      const hasOnBlur = getProp(node.attributes, 'onBlur') !== undefined;

      if (onChange && !hasOnBlur) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
