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
      // Determine if ignoreNonDOM is set to true
      // If true, then do not run rule.
      const options = context.options[0] || {};
      const ignoreNonDOM = !!options.ignoreNonDOM;
      const elType = elementType(node);
      const isDOMNode = dom.get(elType);
      if (ignoreNonDOM && !isDOMNode) {
        return;
      }

      const attr = (attrName) => {
        const value = getLiteralPropValue(getProp(node.attributes, attrName));
        return (typeof value === 'string' ? value : null);
      };
      const props = {
        nodeName: isDOMNode ? elType : 'input',
        nodeType: 1,
      };
      const hasAttr = attrName => attr(attrName) !== null;

      const { violations } = runVirtualRule('autocomplete-valid', { attr, props, hasAttr });

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
