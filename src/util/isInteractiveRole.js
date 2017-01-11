/**
 * @flow
 */
import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import type { JSXAttribute } from 'ast-types-flow';
import DOMElements from './attributes/DOM.json';
import roles from './attributes/role.json';

const VALID_ROLES = Object.keys(roles)
  .filter(role => roles[role].interactive === true);
/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an interactive component. Used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * its intention is to be interacted with in the DOM.
 *
 * isInteractiveRole is a Logical Disjunction:
 * https://en.wikipedia.org/wiki/Logical_disjunction
 * The JSX element does not have a tagName or it has a tagName and a role
 * attribute with a value in the set of non-interactive roles.
 */
const isInteractiveRole = (
  tagName: string,
  attributes: Array<JSXAttribute>,
): boolean => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return true;
  }

  const value: ?string = getLiteralPropValue(getProp(attributes, 'role'));

  // If value is undefined, then the role attribute will be dropped in the DOM.
  // If value is null, then getLiteralAttributeValue is telling us that the
  // value isn't in the form of a literal
  if (value === undefined || value === null) {
    return false;
  }

  const normalizedValues = String(value).toUpperCase().split(' ');
  const isInteractive = normalizedValues.every(
    (val: string): boolean => VALID_ROLES.indexOf(val) > -1,
  );

  return isInteractive;
};

export default isInteractiveRole;
