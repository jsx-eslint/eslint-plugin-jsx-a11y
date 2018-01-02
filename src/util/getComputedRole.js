// @flow
import type { Node } from 'ast-types-flow';
import getExplicitRole from './getExplicitRole';
import getImplicitRole from './getImplicitRole';
/**
 * Returns an element's computed role, which is
 *
 *  1. The valid value of its explicit role attribute; or
 *  2. The implicit value of its tag.
 */
export default function getComputedRole(
  tag: string,
  attributes: Array<Node>,
): ?string {
  return getExplicitRole(tag, attributes) || getImplicitRole(tag, attributes);
}
