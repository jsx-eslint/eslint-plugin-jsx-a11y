/**
 * @fileoverview Enforce that an element does not have an unsupported ARIA attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';
import { getLiteralAttributeValue } from '../util/getAttributeValue';
import getNodeType from '../util/getNodeType';
import ROLES from '../util/attributes/role';
import ARIA from '../util/attributes/ARIA';
import getImplicitRole from '../util/getImplicitRole';

const errorMessage = (attr, role, tag) =>
  `The attribute ${attr} is not supported by the role ${role}. This role may be implicit based on the tag ${tag}.`;

module.exports = context => ({
  JSXOpeningElement: node => {
    // If role is not explicitly defined, then try and get its implicit role.
    const type = getNodeType(node);
    const hasRole = hasAttribute(node.attributes, 'role');
    const role = hasRole ? getLiteralAttributeValue(hasRole) : getImplicitRole(type, node.attributes);

    // If there is no explicit or implicit role, then assume that the element
    // can handle the global set of aria-* properties.
    // This actually isn't true - should fix in future release.
    if (!role || ROLES[role.toUpperCase()] === undefined) {
      return;
    }

    // Make sure it has no aria-* properties defined outside of its property set.
    const propertySet = ROLES[role.toUpperCase()].props;
    const invalidAriaPropsForRole = Object.keys(ARIA).filter(attribute => propertySet.indexOf(attribute) === -1);
    const invalidAttr = hasAttribute(node.attributes, ...invalidAriaPropsForRole);

    if (invalidAttr === false) {
      return;
    }

    context.report({
      node,
      message: errorMessage(invalidAttr.name.name.toLowerCase(), role.toLowerCase(), type.toLowerCase())
    });

  }
});

module.exports.schema = [
  { type: 'object' }
];
