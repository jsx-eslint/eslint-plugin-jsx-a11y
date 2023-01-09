// @flow

import { hasAnyProp } from 'jsx-ast-utils';
import type { JSXElement, Node, JSXOpeningElement } from 'ast-types-flow';
import isHiddenFromScreenReader from './isHiddenFromScreenReader';

export default function hasAccessibleChild(node: JSXElement, elementType: (JSXOpeningElement) => string): boolean {
  return node.children.some((child: Node) => {
    switch (child.type) {
      case 'Literal':
        return !!child.value;
      // $FlowFixMe JSXText is missing in ast-types-flow
      case 'JSXText':
        return !!child.value;
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
