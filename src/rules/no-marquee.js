/**
 * @fileoverview Enforce <marquee> elements are not used.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage =
  'Do not use <marquee> elements as they create accessibility issues and are deprecated.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const isMarquee = elementType(node) === 'marquee';

      if (isMarquee) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
