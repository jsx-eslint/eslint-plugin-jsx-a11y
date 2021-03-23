// @flow

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import isHiddenFromScreenReader from './isHiddenFromScreenReader';

export default function hasAccessibleChild(node: JSXElement): boolean {
  return node.children.some((child) => {
    switch (child.type) {
      case 'Literal':
      case 'JSXText':
        return Boolean(child.value); //exit if there is text within the tags
      case 'JSXElement':
        return !isHiddenFromScreenReader(
          elementType(child.openingElement),
          child.openingElement.attributes,
        ); // exit when the JSXElement is visible for screenreader
      case 'JSXExpressionContainer':
        if (child.expression.type === 'Identifier') {
          return (child.expression.name !== 'undefined') || (child.expression.value !== '');
          // return child.expression.name !== 'undefined';
        }
        return true;
      default:
        return false;
    }
  }) || hasAnyProp(node.openingElement.attributes, ['dangerouslySetInnerHTML', 'children']);
}
