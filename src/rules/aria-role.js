/**
 * @fileoverview Enforce aria role attribute is valid.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom, roles } from 'aria-query';
import { getLiteralPropValue, propName, elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: 'boolean',
    default: false,
  },
});

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-role.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      // Determine if ignoreNonDOM is set to true
      // If true, then do not run rule.
      const options = context.options[0] || {};
      const ignoreNonDOM = !!options.ignoreNonDOM;

      if (ignoreNonDOM) {
        const type = elementType(attribute.parent);
        if (!dom.get(type)) {
          return;
        }
      }

      // Get prop name
      const name = propName(attribute).toUpperCase();

      if (name !== 'ROLE') { return; }

      const value = getLiteralPropValue(attribute);

      // If value is undefined, then the role attribute will be dropped in the DOM.
      // If value is null, then getLiteralAttributeValue is telling us that the
      // value isn't in the form of a literal.
      if (value === undefined || value === null) { return; }

      const values = String(value).split(' ');
      const validRoles = [...roles.keys()].filter((role) => roles.get(role).abstract === false);
      const isValid = values.every((val) => validRoles.indexOf(val) > -1);

      if (isValid === true) { return; }

      context.report({
        node: attribute,
        message: errorMessage,
      });
    },
  }),
};
