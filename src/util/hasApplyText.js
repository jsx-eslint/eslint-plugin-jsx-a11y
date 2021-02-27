// @flow

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import isHiddenFromScreenReader from './isHiddenFromScreenReader';

export default function hasApplyTextd(node: JSXElement): boolean {
  return node.children.some((child) => {
    switch (child.type) {
      case 'Literal':
      case 'JSXText':
        return (Boolean(child.value) && Boolean(child.value.toUpperCase() === 'APPLY') );
      case 'JSXElement':
        return !isHiddenFromScreenReader(
          elementType(child.openingElement),
          child.openingElement.attributes,
        );
      case 'JSXExpressionContainer':
        if (child.expression.type === 'Identifier') {
          return child.expression.name !== 'undefined';
        }
        return true;
      default:
        return false;
    }
  }) || hasAnyProp(node.openingElement.attributes, ['dangerouslySetInnerHTML', 'children']);
}
