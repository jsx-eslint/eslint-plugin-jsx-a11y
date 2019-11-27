/**
 * @fileoverview Ensure autocomplete attribute is correct.
 * @author Wilco Fiers
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
import { runVirtualRule } from 'axe-core';
import { elementType, getLiteralPropValue, getProp } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';

const schema = generateObjSchema({
  inputComponents: arraySchema,
});

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/autocomplete-valid.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const { inputComponents = [] } = options;
      const inputTypes = ['input', ...inputComponents];

      const elType = elementType(node);
      const autocomplete = getLiteralPropValue(getProp(node.attributes, 'autocomplete'));

      if (typeof autocomplete !== 'string' || !inputTypes.includes(elType)) {
        return;
      }

      const { violations } = runVirtualRule('autocomplete-valid', {
        nodeName: 'input',
        attributes: {
          autocomplete,
          // Which autocomplete is valid depends on the input type
          type: getLiteralPropValue(getProp(node.attributes, 'type')),
        },
      });

      if (violations.length === 0) {
        return;
      }
      // Since we only test one rule, with one node, return the message from first (and only) instance of each
      context.report({
        node,
        message: violations[0].nodes[0].all[0].message,
      });
    },
  }),
};
