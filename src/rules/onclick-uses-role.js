/**
 * @fileoverview Enforce non-interactive elements with
 *  click handlers use role attribute.
 * @author Ethan Cohen
 */
'use strict';

import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import hasAttribute from '../util/hasAttribute';
import getAttributeValue from '../util/getAttributeValue';
import getNodeType from '../util/getNodeType';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Visible, non-interactive elements with click handlers must ' +
  'have role attribute.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const attributes = node.attributes;
    if (hasAttribute(attributes, 'onclick') === false) {
      return;
    }

    const isVisible = isHiddenFromScreenReader(attributes) === false;
    const isNonInteractive = isInteractiveElement(getNodeType(node), attributes) === false;
    const roleAttribute = hasAttribute(attributes, 'role');
    const noRoleAttribute = roleAttribute === false || Boolean(getAttributeValue(roleAttribute)) === false;

    // Visible, non-interactive elements require role attribute.
    if (isVisible && isNonInteractive && noRoleAttribute) {
      context.report({
        node,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
