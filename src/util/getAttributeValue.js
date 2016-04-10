'use strict';

import getValue from './values';

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return the most *closely* associated
 * value with the intention of the JSX.
 *
 * @param attribute - The JSXAttribute collected by AST parser.
 */
const getAttributeValue = attribute => {
  if (attribute.type === 'JSXAttribute') {
    if (attribute.value === null) {
      // Null valued attributes imply truthiness.
      // For example: <div aria-hidden />
      // See: https://facebook.github.io/react/docs/jsx-in-depth.html#boolean-attributes
      return true;
    }

    return getValue(attribute.value);
  }

  return undefined;
};

export default getAttributeValue;
