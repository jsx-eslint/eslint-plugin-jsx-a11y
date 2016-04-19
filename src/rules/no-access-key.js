/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';
import getAttributeValue from '../util/getAttributeValue';

const errorMessage = 'No access key attribute allowed. Inconsistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const accessKey = getAttribute(node.attributes, 'accesskey');
    const accessKeyValue = getAttributeValue(accessKey);

    if (accessKey && accessKeyValue) {
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
