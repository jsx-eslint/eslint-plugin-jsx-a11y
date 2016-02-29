/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
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
      var hasOnChange = hasAttribute(node.attributes, 'onChange');
      var hasOnBlur = hasAttribute(node.attributes, 'onBlur');

      if (Boolean(hasOnChange) === true && hasOnBlur === false) {
        context.report({
          node: node,
          message: 'onBlur must be used instead of onchange, unless absolutely necessary and it ' +
            'causes no negative consequences for keyboard only or screen reader users.'
        });
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
