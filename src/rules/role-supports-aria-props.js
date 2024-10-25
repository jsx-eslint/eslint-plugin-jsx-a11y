/**
 * @fileoverview Enforce that elements with explicit or implicit roles defined contain only
 * `aria-*` properties supported by that `role`.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  aria,
  roles,
} from 'aria-query';
import {
  getProp,
  getLiteralPropValue,
  getPropValue,
  propName,
} from 'jsx-ast-utils';

import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';
import getImplicitRole from '../util/getImplicitRole';

const errorMessage = (attr, role, tag, isImplicit) => {
  if (isImplicit) {
    return `The attribute ${attr} is not supported by the role ${role}. This role is implicit on the element ${tag}.`;
  }

  return `The attribute ${attr} is not supported by the role ${role}.`;
};

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/role-supports-aria-props.md',
      description: 'Enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`.',
    },
    schema: [schema],
  },

  create(context) {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement(node) {
        // If role is not explicitly defined, then try and get its implicit role.
        const type = elementType(node);
        const role = getProp(node.attributes, 'role');
        const roleValue = role ? getLiteralPropValue(role) : getImplicitRole(type, node.attributes);
        const isImplicit = roleValue && role === undefined;

        // If there is no explicit or implicit role, then assume that the element
        // can handle the global set of aria-* properties.
        // This actually isn't true - should fix in future release.
        if (
          typeof roleValue !== 'string'
          || roles.get(roleValue) === undefined
        ) {
          return;
        }

        // Make sure it has no aria-* properties defined outside its property set.
        const {
          props: propKeyValues,
        } = roles.get(roleValue);
        const invalidAriaPropsForRole = new Set(aria.keys().filter((attribute) => !(attribute in propKeyValues)));

        node.attributes.filter((prop) => (
          getPropValue(prop) != null // Ignore the attribute if its value is null or undefined.
          && prop.type !== 'JSXSpreadAttribute' // Ignore the attribute if it's a spread.
        )).forEach((prop) => {
          const name = propName(prop);
          if (invalidAriaPropsForRole.has(name)) {
            context.report({
              node,
              message: errorMessage(name, roleValue, type, isImplicit),
            });
          }
        });
      },
    };
  },
};
