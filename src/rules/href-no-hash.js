/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { componentAndPropSchema } from '../util/schemas';

const errorMessage = 'Links must not point to "#". ' +
  'Use a more descriptive href or use a button instead.';

module.exports = {
  meta: {
    docs: {},
    schema: [componentAndPropSchema],
  },

  create: context => ({
    JSXOpeningElement: node => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typesToValidate = ['a'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'a' elements and custom types.
      if (typesToValidate.indexOf(nodeType) === -1) {
        return;
      }

      const propOptions = options.props || [];
      const propsToValidate = ['href'].concat(propOptions);
      const values = propsToValidate
        .map(prop => getProp(node.attributes, prop))
        .map(prop => getPropValue(prop));

      values.forEach(value => {
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
