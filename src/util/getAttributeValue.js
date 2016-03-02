'use strict';

const getAttributeValue = attribute => {
  if (attribute.value === null) {
    return null;
  } else if (attribute.type === 'JSXAttribute') {

    if (attribute.value.type === 'Literal') {
      return attribute.value.value;
    } else if (attribute.value.type === 'JSXExpressionContainer') {
      const expression = attribute.value.expression;

      switch (expression.type) {
        case 'Literal':
          return expression.value;
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
