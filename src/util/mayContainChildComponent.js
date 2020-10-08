/**
 * Returns true if it can positively determine that the element lacks an
 * accessible label. If no determination is possible, it returns false. Treat
 * false as an unknown value. The element might still have an accessible label,
 * but this module cannot determine it positively.
 *
 * @flow
 */

import { elementType } from 'jsx-ast-utils';
import type { Node } from 'ast-types-flow';
import minimatch from 'minimatch';

export default function mayContainChildComponent(
  root: Node,
  componentName: string,
  maxDepth: number = 1,
): boolean {
  function traverseChildren(
    node: Node,
    depth: number,
  ): boolean {
    // Bail when maxDepth is exceeded.
    if (depth > maxDepth) {
      return false;
    }
    if (node.children) {
      /* $FlowFixMe */
      for (let i = 0; i < node.children.length; i += 1) {
        /* $FlowFixMe */
        const childNode = node.children[i];
        // Assume an expression container renders a label. It is the best we can
        // do in this case.
        if (childNode.type === 'JSXExpressionContainer') {
          return true;
        }
        // Check for comonents with the provided name.
        if (
          childNode.type === 'JSXElement'
          && childNode.openingElement
          && minimatch(elementType(childNode.openingElement), componentName)
        ) {
          return true;
        }
        if (traverseChildren(childNode, depth + 1)) {
          return true;
        }
      }
    }
    return false;
  }
  return traverseChildren(root, 1);
}
