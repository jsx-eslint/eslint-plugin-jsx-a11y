/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import { getCustomComponents } from '../util/settings/resolve';

const errorMessage =
  'Links must not point to "#". Use a more descriptive href or use a button instead.';

const schema = generateObjSchema({
  a: arraySchema,
  specialLink: arraySchema,
});

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const typesToValidate = getCustomComponents(context, 'a').a;
      const nodeType = elementType(node);

      // Only check 'a' elements and custom types.
      if (typesToValidate.indexOf(nodeType) === -1) {
        return;
      }

      const propOptions = options.specialLink || [];
      const propsToValidate = ['href'].concat(propOptions);
      const values = propsToValidate
        .map(prop => getProp(node.attributes, prop))
        .map(prop => getPropValue(prop));

      values.forEach((value) => {
        if (value === '#') {
          context.report({
            node,
            message: errorMessage,
          });
        }
      });
    },
  }),
};
