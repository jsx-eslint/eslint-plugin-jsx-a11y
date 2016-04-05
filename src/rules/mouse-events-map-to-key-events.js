/**
 * @fileoverview Enforce onmouseover/onmouseout are
 *  accompanied by onfocus/onblur.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';
import getAttributeValue from '../util/getAttributeValue';

const mouseOverErrorMessage = 'onMouseOver must be accompanied by onFocus for accessibility.';
const mouseOutErrorMessage = 'onMouseOut must be accompanied by onBlur for accessibility.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const attributes = node.attributes;

    // Check onmouseover / onfocus pairing.
    const hasOnMouseOver = hasAttribute(attributes, 'onMouseOver');
    const onMouseOverValue = getAttributeValue(hasOnMouseOver);

    if (Boolean(hasOnMouseOver) === true && (onMouseOverValue !== null || onMouseOverValue !== undefined)) {
      const hasOnFocus = hasAttribute(attributes, 'onFocus');
      const onFocusValue = getAttributeValue(hasOnFocus);

      if (hasOnFocus === false || onFocusValue === null || onFocusValue === undefined) {
        context.report({
          node,
          message: mouseOverErrorMessage
        });
      }
    }

    // Checkout onmouseout / onblur pairing
    const hasOnMouseOut = hasAttribute(attributes, 'onMouseOut');
    const onMouseOutValue = getAttributeValue(hasOnMouseOut);
    if (Boolean(hasOnMouseOut) === true && (onMouseOutValue !== null || onMouseOutValue !== undefined)) {
      const hasOnBlur = hasAttribute(attributes, 'onBlur');
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
