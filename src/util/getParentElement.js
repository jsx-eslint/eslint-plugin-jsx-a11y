/**
 * Given a node and the eslint context, return the node's parent element,
 * but only if it's a JSXElement or JSXFragment.
 *
 * @flow
 */

import type { JSXElement, Node } from 'ast-types-flow';

import type { ESLintContext } from '../../flow/eslint';
import type { JSXFragment } from '../../flow/eslint-jsx';

const getParentElement = (node: Node, context: ESLintContext): JSXElement | JSXFragment | void => {
  const ancestors = context.sourceCode?.getAncestors?.(node) || context.getAncestors?.() || [];
  if (ancestors.length === 0) {
    return undefined;
  }
  const parent = ancestors[ancestors.length - 1];
  if (parent.type === 'JSXElement' || parent.type === 'JSXFragment') {
    return parent;
  }
  return undefined;
};

export default getParentElement;
