/**
 * @fileoverview Enforce iframe elements have a title attribute.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '<iframe> elements must have a unique title property.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/iframe-has-title.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const type = elementType(node);

      if (type && type !== 'iframe') {
        return;
      }

      const title = getPropValue(getProp(node.attributes, 'title'));

      if (title && typeof title === 'string') {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
