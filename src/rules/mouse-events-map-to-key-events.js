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

const mouseOverErrorMessage = 'onMouseOver must be accompanied by onFocus for accessibility.';
const mouseOutErrorMessage = 'onMouseOut must be accompanied by onBlur for accessibility.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const attributes = node.attributes;

    // Check onmouseover / onfocus pairing.
    const hasOnMouseOver = hasAttribute(attributes, 'onMouseOver');
    if (Boolean(hasOnMouseOver) === true) {
      const hasOnFocus = hasAttribute(attributes, 'onFocus');
      if (hasOnFocus === false) {
        context.report({
          node,
          message: mouseOverErrorMessage
        });
      }
    }

    // Checkout onmouseout / onblur pairing
    const hasOnMouseOut = hasAttribute(attributes, 'onMouseOut');
    if (Boolean(hasOnMouseOut) === true) {
      const hasOnBlur = hasAttribute(attributes, 'onBlur');
      if (hasOnBlur === false) {
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
