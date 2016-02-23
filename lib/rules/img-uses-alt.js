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
      var hasAltProp = node.attributes.some(function(attribute) {
        // If the attributes contain a spread attribute, then pass rule.
        if (attribute.type === 'JSXSpreadAttribute') {
          return true;
        }

        return attribute.name.name.toUpperCase() === 'ALT';
      });

      if (hasAltProp === false) {
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
