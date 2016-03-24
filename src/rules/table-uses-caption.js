/**
 * @fileoverview Enforce table element has child of caption with value.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasChild from '../util/hasChild';

const errorMessage = type => `${type} elements must have a caption element as child to ` +
  `programatically associate captions for data tables.`;

module.exports = context => ({
  JSXOpeningElement: node => {
    const typeCheck = [ 'table' ].concat(context.options[0]);
    const nodeType = node.name.name;

    // Only check 'table' elements and custom types.
    if (typeCheck.indexOf(nodeType) === -1) {
      return;
    }

    const hasCaption = hasChild(node.parent.children, 'caption');

    if (hasCaption === false) {
      context.report({
        node,
        message: errorMessage(nodeType)
      });
    }
  }
});

module.exports.schema = [
  {
    "oneOf": [
      { "type": "string" },
      {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      }
    ]
  }
];
