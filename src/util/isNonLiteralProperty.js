/**
 * @flow
 */

import type { Node } from 'ast-types-flow';
import { getProp } from 'jsx-ast-utils';

/**
 * Returns boolean indicating whether the given element has been specified with
 * an AST node with a non-literal type.
 *
 * Returns true if the elements has a role and its value is not of a type Literal.
 * Otherwise returns false.
 */

const isNonLiteralProperty = (
  attributes: Array<Node>,
  propName: string,
): boolean => {
  const prop = getProp(attributes, propName);
  if (!prop) return false;

  const propValue = prop.value;
  if (!propValue) return false;

  if (propValue.type === 'Literal') return false;

  if (propValue.type === 'JSXExpressionContainer') {
    const { expression } = propValue;
    if (expression.type === 'Identifier' && expression.name === 'undefined') return false;
    if (expression.type === 'JSXText') return false;
  }

  return true;
};

export default isNonLiteralProperty;
