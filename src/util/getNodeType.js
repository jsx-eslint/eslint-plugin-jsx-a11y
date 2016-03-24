'use strict';

const getNodeType = node => {
  const { name } = node;

  if (name.type === 'JSXMemberExpression') {
    const { object, property } = name;
    return `${object.name}.${property.name}`;
  }

  return node.name.name;
};

export default getNodeType;

