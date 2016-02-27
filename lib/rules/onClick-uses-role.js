/**
 * @fileoverview Enforce non-interactive elements with click handlers use role attribute.
 * @author Ethan Cohen
 */
'use strict';

var isHiddenFromScreenReader = require('../isHiddenFromScreenReader');
var isInteractiveElement = require('../isInteractiveElement');
var hasAttribute = require('../hasAttribute');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function(context) {
  return {
    JSXOpeningElement: function(node) {
      var attributes = node.attributes;
      if (hasAttribute(attributes, 'onclick') === false) {
        return;
      }

      var isHidden = isHiddenFromScreenReader(attributes);
      var isInteractive = isInteractiveElement(node.name.name, attributes);
      var hasRoleAttribute = hasAttribute(attributes, 'role');

      // Visible, non-interactive elements require role attribute.
      if (isHidden === false && isInteractive === false && hasRoleAttribute === false) {
        context.report({
          node: node,
          message: 'Visible, non-interactive elements with click handlers must have role attribute.'
        });
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
