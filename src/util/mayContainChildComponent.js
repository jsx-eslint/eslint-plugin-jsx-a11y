/**
 * Returns true if it can positively determine that the element has a
 * child element matching the elementType matching function.
 *
 * @flow
 */

import type { JSXOpeningElement, Node } from 'ast-types-flow';
import { elementType as rawElementType } from 'jsx-ast-utils';
import getChildComponent from './getChildComponent';

export default function mayContainChildComponent(
  root: Node,
  componentName: string,
  maxDepth: number = 1,
  elementType: ((node: JSXOpeningElement) => string) = rawElementType,
): boolean {
  return !!getChildComponent(root, componentName, maxDepth, elementType);
}
