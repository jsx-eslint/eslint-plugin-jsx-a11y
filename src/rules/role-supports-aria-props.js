/**
 * @fileoverview Enforce that elements with explicit or implicit roles defined contain only
 * `aria-*` properties supported by that `role`.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';
import { getLiteralAttributeValue } from '../util/getAttributeValue';
import getNodeType from '../util/getNodeType';
import ROLES from '../util/attributes/role';
import ARIA from '../util/attributes/ARIA';
import getImplicitRole from '../util/getImplicitRole';

const errorMessage = (attr, role, tag, isImplicit) => {
  if (isImplicit) {
    return `The attribute ${attr} is not supported by the role ${role}. This role is implicit on the element ${tag}.`;
  }

  return `The attribute ${attr} is not supported by the role ${role}.`;
};

module.exports = context => ({
  JSXOpeningElement: node => {
    // If role is not explicitly defined, then try and get its implicit role.
    const type = getNodeType(node);
    const role = getAttribute(node.attributes, 'role');
    const roleValue = role ? getLiteralAttributeValue(role) : getImplicitRole(type, node.attributes);
    const isImplicit = roleValue && role === undefined;

    // If there is no explicit or implicit role, then assume that the element
    // can handle the global set of aria-* properties.
    // This actually isn't true - should fix in future release.
    if (!roleValue || ROLES[roleValue.toUpperCase()] === undefined) {
      return;
    }

    // Make sure it has no aria-* properties defined outside of its property set.
    const propertySet = ROLES[roleValue.toUpperCase()].props;
    const invalidAriaPropsForRole = Object.keys(ARIA).filter(attribute => propertySet.indexOf(attribute) === -1);
    const invalidAttr = getAttribute(node.attributes, ...invalidAriaPropsForRole);

    if (invalidAttr === undefined) {
      return;
    }

    context.report({
      node,
      message: errorMessage(invalidAttr.name.name, roleValue, type, isImplicit)
    });

  }
});

module.exports.schema = [
  { type: 'object' }
];
