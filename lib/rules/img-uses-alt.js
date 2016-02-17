/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

// function containsAlt(attribute) {

// };

module.exports = function(context) {

  // var configuration = context.options[0] || {};

  return {
    JSXOpeningElement: function(node) {
      var hasAltProp = node.attributes.some(function(attribute, idx, attrs) {
        // If the only attribute is a spread attribute, then pass rule.
        if (attribute.type === 'JSXSpreadAttribute' && attrs.length === 1) {
          return true;
        } else if (attribute.type === 'JSXSpreadAttribute') {
          return false;
        }

        return attribute.name.name.toUpperCase() === 'ALT';
      });

      if (!hasAltProp) {
        context.report({
          node: node,
          message: 'IMG element must have alt tag.'
        });
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
