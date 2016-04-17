/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */
'use strict';

import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import hasAttribute from '../util/hasAttribute';
import getNodeType from '../util/getNodeType';
import getAttributeValue from '../util/getAttributeValue';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Elements with onClick handlers must be focusable. ' +
  'Either set the tabIndex property (usually 0), or use an element type which ' +
  'is inherently focusable such as `button`.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const { attributes } = node;
    if (hasAttribute(attributes, 'onClick') === false) {
      return;
    }

    const type = getNodeType(node);

    if (isHiddenFromScreenReader(type, attributes)) {
      return;
    } else if (isInteractiveElement(type, attributes)) {
      return;
    } else if (getAttributeValue(hasAttribute(attributes, 'tabIndex'))) {
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
