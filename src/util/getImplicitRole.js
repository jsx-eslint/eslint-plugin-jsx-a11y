// @flow
import { roles as rolesMap } from 'aria-query';
import type { Node } from 'ast-types-flow';
import implicitRoles from './implicitRoles';

/**
 * Returns an element's implicit role given its attributes and type.
 * Some elements only have an implicit role when certain props are defined.
 */
export default function getImplicitRole(
  type: string,
  attributes: Array<Node>,
): ?string {
  let implicitRole;
  if (implicitRoles[type]) {
    implicitRole = implicitRoles[type](attributes);
  }
  if (rolesMap.has(implicitRole)) {
    return implicitRole;
  }
  return null;
}
