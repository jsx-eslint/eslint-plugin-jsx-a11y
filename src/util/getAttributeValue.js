'use strict';

import buildTemplateLiteral from './buildTemplateLiteral';

const getValue = value => {
  if (value.type === 'Literal') {
    return value.value;
  } else if (value.type === 'Identifier') {
    return value.name === "" ? undefined : value.name;
  } else if (value.type === 'JSXElement') {
    return undefined; // For now, just so things don't break.
  }

  const { expression } = value;
  const type = expression ? expression.type : value.type;
  const obj = expression || value;

  switch (type) {
    case 'Literal':
      return obj.value;
    case 'TemplateLiteral':
      return buildTemplateLiteral(obj);
    case 'Identifier':
      return obj.name == 'undefined' ? undefined : obj.name;
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      return () => void 0;
    case 'LogicalExpression':
      const { operator, left, right } = obj;
      const leftVal = getValue(left);
      const rightVal = getValue(right);

      return operator == '&&' ? leftVal && rightVal : leftVal || rightVal;
    case 'MemberExpression':
      return `${getValue(obj.object)}.${getValue(obj.property)}`;
    case 'CallExpression':
      return getValue(obj.callee);
    default:
      return undefined;
  }

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
