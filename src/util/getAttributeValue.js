'use strict';

import buildTemplateLiteral from './buildTemplateLiteral';

const getValue = value => {
  if (value.type === 'Literal') {
    return value.value === "" ? undefined : value.value;
  } else if (value.type === 'Identifier') {
    return value.name === "" ? undefined : value.name;
  } else if (value.type === 'JSXExpressionContainer') {
    const { expression } = value;

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
      case 'LogicalExpression':
        const { operator, left, right } = expression;
        const leftVal = getValue(left);
        const rightVal = getValue(right);

        return operator == '&&' ? leftVal && rightVal : leftVal || rightVal;
      case 'MemberExpression':
        return `${getValue(expression.object)}.${expression.property}`;
      default:
        return undefined;
    }
  }

  return undefined;
};

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
    return getValue(attribute.value);
  }

  return undefined;
};

export default getAttributeValue;
