'use strict';

/**
 * Returns the tagName associated with a JSXElement.
 */
export default function getNodeType(node) {
  const { name } = node;

  if (name.type === 'JSXMemberExpression') {
    const { object, property } = name;
    return `${object.name}.${property.name}`;
  }

  return node.name.name;
}

