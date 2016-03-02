'use strict';

import buildTemplateLiteral from './buildTemplateLiteral';

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return the most *closely* associated
 * value with the intention of the JSX.
 */
const getAttributeValue = attribute => {
  if (attribute.value === null) {
    return null;
  } else if (attribute.type === 'JSXAttribute') {

    if (attribute.value.type === 'Literal') {
      return attribute.value.value === "" ? undefined : attribute.value.value;
    } else if (attribute.value.type === 'JSXExpressionContainer') {
      const expression = attribute.value.expression;

      switch (expression.type) {
        case 'Literal':
          return expression.value === "" ? undefined : expression.value;
        case 'TemplateLiteral':
          return buildTemplateLiteral(expression);
        case 'Identifier':
          return expression.name == 'undefined' ? undefined : expression.name;
        case 'ArrowFunctionExpression':
        case 'FunctionExpression':
          return () => void 0;
        default:
          return undefined;
      }
    }
  }

  return undefined;
};

export default getAttributeValue;
