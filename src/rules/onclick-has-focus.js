/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */
'use strict';

import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import hasAttribute from '../util/hasAttribute';
import getNodeType from '../util/getNodeType';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Elements with onClick handlers must be focusable. ' +
  'You can either set the tabIndex property, or use an element type which is inherently focusable.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const attributes = node.attributes;
    if (hasAttribute(attributes, 'onclick') === false) {
      return;
    }

    const isVisible = isHiddenFromScreenReader(attributes) === false;
    if (isVisible === false) {
      return;
    }

    const isNonInteractive = isInteractiveElement(getNodeType(node), attributes) === false;
    if (isNonInteractive === false) {
      return;
    }

    const noTabIndex = hasAttribute(attributes, 'tabIndex') === false;
    if (noTabIndex === false) {
      return;
    }

    context.report({
      node,
      message: errorMessage
    });
  }
});

module.exports.schema = [
  { type: 'object' }
];
