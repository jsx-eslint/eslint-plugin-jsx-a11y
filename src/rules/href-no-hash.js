/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';
import getAttributeValue from '../util/getAttributeValue';
import getNodeType from '../util/getNodeType';

const errorMessage = 'Links must not point to "#". Use a more descriptive href or use a button instead.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const typeCheck = [ 'a' ].concat(context.options[0]);
    const nodeType = getNodeType(node);

    // Only check 'a' elements and custom types.
    if (typeCheck.indexOf(nodeType) === -1) {
      return;
    }

    const href = getAttribute(node.attributes, 'href');
    const value = getAttributeValue(href);

    if (href && value === '#') {
      context.report({
        node,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  {
    'oneOf': [
      { 'type': 'string' },
      {
        'type': 'array',
        'items': {
          'type': 'string'
        },
        'minItems': 1,
        'uniqueItems': true
      }
    ]
  }
];
