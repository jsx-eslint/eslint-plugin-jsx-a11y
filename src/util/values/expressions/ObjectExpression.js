'use strict';

import getValue from './index';



/**
 * Extractor function for an ObjectExpression type value node.
 * An object expression is using {}.
 *
 * @returns - a representation of the object
 */
export default function extractValueFromObjectExpression(value) {
  return value.properties.reduce((obj, property) => {
    obj[property.key] = getValue(property.value);
    return obj;
  }, {});
}
