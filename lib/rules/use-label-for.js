/**
 * @fileoverview Enforce label tags have htmlFor attribute.
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
      if (type.toUpperCase() !== 'LABEL') {
        return;
      }

      var hasHtmlForAttr = hasAttribute(node.attributes, 'htmlFor');

      if (hasHtmlForAttr === false) {
        context.report({
          node: node,
          message: 'Form controls using a label to identify them must have only one label ' +
            'that is programmatically associated with the control using: label for=[ID of control].'
        });
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
