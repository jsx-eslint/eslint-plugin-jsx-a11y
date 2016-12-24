/**
 * @fileoverview Enforce no <blink> elements are used.
 * @author Ethan Cohen <@evcohen>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage =
  'Do not use <blink> elements as they can create visual accessibility issues and are deprecated.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const isBlink = elementType(node) === 'blink';

      if (isBlink) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
