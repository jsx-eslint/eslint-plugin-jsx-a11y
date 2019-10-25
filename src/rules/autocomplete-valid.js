/**
 * @fileoverview Ensure autocomplete attribute is correct.
 * @author Wilco Fiers
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
import { dom } from 'aria-query';
import { runVirtualRule } from 'axe-core';
import { elementType, getLiteralPropValue, getProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: 'boolean',
    default: false,
  },
});

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/autocomplete-valid.md',
    },
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const ignoreNonDOM = !!options.ignoreNonDOM;

      const autocomplete = getLiteralPropValue(getProp(node.attributes, 'autocomplete'));
      const elType = elementType(node);
      const isNativeDOMNode = !!dom.get(elType);

      if (typeof autocomplete !== 'string'
        || (isNativeDOMNode && elType !== 'input')
        || (!isNativeDOMNode && ignoreNonDOM)
      ) {
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
