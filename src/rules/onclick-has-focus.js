/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */
'use strict';

import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import getAttribute from '../util/getAttribute';
import getNodeType from '../util/getNodeType';
import getAttributeValue from '../util/getAttributeValue';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Elements with onClick handlers must be focusable. ' +
  'Either set the tabIndex property to a valid value (usually 0), or use ' +
  'an element type which is inherently focusable such as `button`.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const { attributes } = node;
    if (getAttribute(attributes, 'onClick') === undefined) {
      return;
    }

    const type = getNodeType(node);

    if (isHiddenFromScreenReader(type, attributes)) {
      return;
    } else if (isInteractiveElement(type, attributes)) {
      return;
    } else if (!isNaN(Number(getAttributeValue(getAttribute(attributes, 'tabIndex'))))) {
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
