/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';
import getAttributeValue from '../util/getAttributeValue';
import getNodeType from '../util/getNodeType';

module.exports = context => ({
  JSXOpeningElement: node => {
    const typeCheck = [ 'img' ].concat(context.options[0]);
    const nodeType = getNodeType(node);

    // Only check 'img' elements and custom types.
    if (typeCheck.indexOf(nodeType) === -1) {
      return;
    }

    const hasRoleProp = hasAttribute(node.attributes, 'role');
    const roleValue = getAttributeValue(hasRoleProp);
    const isPresentation = hasRoleProp && roleValue.toLowerCase() === 'presentation';

    if (isPresentation) {
      return;
    }

    const hasAltProp = hasAttribute(node.attributes, 'alt');

    // Missing alt prop error.
    if (!hasAltProp) {
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop or use role="presentation".`
      });
      return;
    }

    // Check if alt prop is undefined.
    const altValue = getAttributeValue(hasAltProp);

    if (altValue || altValue === '') {
      return;
    }

    // Undefined alt prop error.
    context.report({
      node,
      message:
        `Invalid alt value for ${nodeType}. Use alt="" or role="presentation" for presentational images.`
    });
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
