/**
 * @fileoverview Enforce no accesskey attribute on element.
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
      var hasAccessKey = hasAttribute(node.attributes, 'accesskey');

      if (Boolean(hasAccessKey) === true) {
        context.report({
          node: node,
          message: 'Inconsistencies between keyboard shortcuts and keyboard commands used by screenreader ' +
          'and keyboard only users create accessibility complications so to avoid complications, access keys ' +
          'should not be used.'
        });
      }
    }
  };
};

module.exports.schema = [{
  type: 'object'
}];
