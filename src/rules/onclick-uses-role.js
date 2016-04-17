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

    const type = getNodeType(node);

    if (isHiddenFromScreenReader(type, attributes)) {
      return;
    } else if (isInteractiveElement(type, attributes)) {
      return;
    } else if (getAttributeValue(hasAttribute(attributes, 'role'))) {
      return;
    }

    // Visible, non-interactive elements require role attribute.
    context.report({
      node,
      message: errorMessage
    });
  }
});

module.exports.schema = [
  { type: 'object' }
];
