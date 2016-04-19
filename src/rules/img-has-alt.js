/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import getAttribute from '../util/getAttribute';
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

    const roleProp = getAttribute(node.attributes, 'role');
    const roleValue = getAttributeValue(roleProp);
    const isPresentation = roleProp && roleValue.toLowerCase() === 'presentation';

    if (isPresentation) {
      return;
    }

    const altProp = getAttribute(node.attributes, 'alt');

    // Missing alt prop error.
    if (altProp === undefined) {
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop or use role="presentation".`
      });
      return;
    }

    // Check if alt prop is undefined.
    const altValue = getAttributeValue(altProp);
    const isNullValued = altProp.value === null; // <img alt />

    if ((altValue && !isNullValued) || altValue === '') {
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
