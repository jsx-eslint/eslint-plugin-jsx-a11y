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

    // Missing alt prop error.
    if (!hasAltProp) {
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop.`
      });
      return;
    }

    // Check if alt prop is undefined.
    const altProp = getAttributeValue(hasAltProp);

    // Check if alt prop is ""
    const emptyAlt = hasAltProp && hasAltProp.value
      && hasAltProp.value.type === 'Literal'
      && hasAltProp.value.value === "";

    const hasRoleProp = hasAttribute(node.attributes, 'role');
    const roleProp = getAttributeValue(hasRoleProp);

    // Allow altProp to be "" if `role="presentation"` is present.
    const isValid = altProp || (emptyAlt && hasRoleProp && roleProp.toUpperCase() === 'PRESENTATION');

    // Undefined alt prop error.
    if (!isValid) {
      context.report({
        node,
        message: `${nodeType} alt prop must have a value. You can set alt="" if role="presentation" is applied.`
      });
      return;
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
