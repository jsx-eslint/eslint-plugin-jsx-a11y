/**
 * @fileoverview Enforce img tag uses alt attribute.
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
      var type = node.name.name;
      if (type.toUpperCase() !== 'IMG') {
        return;
      }

      var hasAltProp = hasAttribute(node.attributes, 'alt');

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
