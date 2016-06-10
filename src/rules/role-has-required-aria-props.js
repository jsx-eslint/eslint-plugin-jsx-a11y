/**
 * @fileoverview Enforce that elements with ARIA roles must
 *  have all required attributes for that role.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import validRoleTypes from '../util/attributes/role';
import { getProp, getLiteralPropValue, propName } from 'jsx-ast-utils';


const errorMessage = (role, requiredProps) =>
  `Elements with the ARIA role "${role}" must have the following ` +
  `attributes defined: ${String(requiredProps).toLowerCase()}`;

module.exports = context => ({
  JSXAttribute: attribute => {
    const name = propName(attribute);
    const normalizedName = name ? name.toUpperCase() : '';

    if (normalizedName !== 'ROLE') {
      return;
    }

    const value = getLiteralPropValue(attribute);

    // If value is undefined, then the role attribute will be dropped in the DOM.
    // If value is null, then getLiteralAttributeValue is telling us
    // that the value isn't in the form of a literal.
    if (value === undefined || value === null) {
      return;
    }

    const normalizedValues = String(value).toUpperCase().split(' ');
    const validRoles = normalizedValues
      .filter(val => Object.keys(validRoleTypes).indexOf(val) > -1);

    validRoles.forEach(role => {
      const { requiredProps } = validRoleTypes[role];

      if (requiredProps.length > 0) {
        const hasRequiredProps = requiredProps
          .every(prop => getProp(attribute.parent.attributes, prop));

        if (hasRequiredProps === false) {
          context.report({
            node: attribute,
            message: errorMessage(role.toLowerCase(), requiredProps),
          });
        }
      }
    });
  },
});

module.exports.schema = [
  { type: 'object' },
];
