// @flow

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import type { JSXElement, Node } from 'ast-types-flow';
import isHiddenFromScreenReader from './isHiddenFromScreenReader';

export default function hasAccessibleChild(node: JSXElement): boolean {
  return node.children.some((child: Node) => {
    switch (child.type) {
      case 'Literal':
        return Boolean(child.value);
      // $FlowFixMe JSXText is missing in ast-types-flow
      case 'JSXText':
        return Boolean(child.value);
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
