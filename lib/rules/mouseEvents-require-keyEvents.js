/**
 * @fileoverview Enforce onmouseover/onmouseout are accompanied by onfocus/onblur.
 * @author Ethan Cohen
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

var hasAttribute = require('../hasAttribute');

module.exports = function(context) {

  return {
    JSXOpeningElement: function(node) {
      var attributes = node.attributes;

      // Check onmouseover / onfocus pairing.
      var hasOnMouseOver = hasAttribute(attributes, 'onMouseOver');
      if (Boolean(hasOnMouseOver) === true) {
        var hasOnFocus = hasAttribute(attributes, 'onFocus');
        if (hasOnFocus === false) {
          context.report({
            node: node,
            message: 'onMouseOver must be accompanied by onFocus for accessibility.'
          });
        }
      }

      // Checkout onmouseout / onblur pairing
      var hasOnMouseOut = hasAttribute(attributes, 'onMouseOut');
      if (Boolean(hasOnMouseOut) === true) {
        var hasOnBlur = hasAttribute(attributes, 'onBlur');
        if (hasOnBlur === false) {
          context.report({
            node: node,
            message: 'onMouseOut must be accompanied by onBlur for accessibility.'
          });
        }
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
