/**
 * @fileoverview Enforce non-interactive elements with
 *  click handlers use role attribute.
 * @author Ethan Cohen
 */
'use strict';

import isHiddenFromScreenReader from '../isHiddenFromScreenReader';
import isInteractiveElement from '../isInteractiveElement';
import hasAttribute from '../hasAttribute';

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
    const isNonInteractive = isInteractiveElement(node.name.name, attributes) === false;
    const noRoleAttribute = hasAttribute(attributes, 'role') === false;

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
