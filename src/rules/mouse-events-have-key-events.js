/**
 * @fileoverview Enforce onmouseover/onmouseout are
 *  accompanied by onfocus/onblur.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';
import getAttributeValue from '../util/getAttributeValue';

const mouseOverErrorMessage = 'onMouseOver must be accompanied by onFocus for accessibility.';
const mouseOutErrorMessage = 'onMouseOut must be accompanied by onBlur for accessibility.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const attributes = node.attributes;

    // Check onmouseover / onfocus pairing.
    const onMouseOver = getAttribute(attributes, 'onMouseOver');
    const onMouseOverValue = getAttributeValue(onMouseOver);

    if (onMouseOver && (onMouseOverValue !== null || onMouseOverValue !== undefined)) {
      const hasOnFocus = getAttribute(attributes, 'onFocus');
      const onFocusValue = getAttributeValue(hasOnFocus);

      if (hasOnFocus === false || onFocusValue === null || onFocusValue === undefined) {
        context.report({
          node,
          message: mouseOverErrorMessage
        });
      }
    }

    // Checkout onmouseout / onblur pairing
    const onMouseOut = getAttribute(attributes, 'onMouseOut');
    const onMouseOutValue = getAttributeValue(onMouseOut);
    if (onMouseOut && (onMouseOutValue !== null || onMouseOutValue !== undefined)) {
      const hasOnBlur = getAttribute(attributes, 'onBlur');
      const onBlurValue = getAttributeValue(hasOnBlur);

      if (hasOnBlur === false || onBlurValue === null || onBlurValue === undefined) {
        context.report({
          node,
          message: mouseOutErrorMessage
        });
      }
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
