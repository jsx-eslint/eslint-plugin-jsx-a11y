/**
 * @flow
 */

import type {
  JSXElement, JSXExpressionContainer, JSXOpeningElement, Node,
} from 'ast-types-flow';
import { elementType as rawElementType } from 'jsx-ast-utils';
import minimatch from 'minimatch';

export default function getChildComponent(
  root: Node,
  componentName: string,
  maxDepth: number = 1,
  elementType: ((node: JSXOpeningElement) => string) = rawElementType,
): JSXElement | JSXExpressionContainer | void {
  function traverseChildren(
    node: Node,
    depth: number,
  ): JSXElement | JSXExpressionContainer | void {
    // Bail when maxDepth is exceeded.
    if (depth > maxDepth) {
      return undefined;
    }
    if (node.children) {
      /* $FlowFixMe */
      for (let i = 0; i < node.children.length; i += 1) {
        /* $FlowFixMe */
        const childNode = node.children[i];
        // Assume an expression container satisfies our conditions. It is the best we can
        // do in this case.
        if (childNode.type === 'JSXExpressionContainer') {
          return childNode;
        }
        // Check for components with the provided name.
        if (
          childNode.type === 'JSXElement'
          && childNode.openingElement
          && minimatch(elementType(childNode.openingElement), componentName)
        ) {
          return childNode;
        }
        const grandChild = traverseChildren(childNode, depth + 1);
        if (grandChild) {
          return grandChild;
        }
      }
    }
    return undefined;
  }
  return traverseChildren(root, 1);
}
