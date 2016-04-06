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

    const hasAltProp = hasAttribute(node.attributes, 'alt');

    if (!hasAltProp) {
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop`
      });
      return;
    }

    const altProp = hasAltProp ? getAttributeValue(hasAltProp) : undefined;
    const isInvalid = hasAltProp === false || Boolean(altProp) === false;

    if (isInvalid) {
      context.report({
        node,
        message: `${nodeType} alt prop must have a value`
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
