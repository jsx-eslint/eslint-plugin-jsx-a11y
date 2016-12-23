/**
 * @fileoverview Enforce frame elements have a title attribute.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'Frame elements (frame, iframe) must have a unique title property.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const type = elementType(node);
      const isFrameElement = type && (type === 'frame' || type === 'iframe');

      if (!isFrameElement) {
        return;
      }

      const title = getPropValue(getProp(node.attributes, 'title'));

      if (title) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
