/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = 'No access key attribute allowed. Incosistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const hasAccessKey = hasAttribute(node.attributes, 'accesskey');

    if (Boolean(hasAccessKey) === true) {
      context.report({
        node,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
