import {
  dom,
  roles,
} from 'aria-query';
import { getProp, getLiteralPropValue } from 'jsx-ast-utils';


const VALID_ROLES = [...roles.keys()]
  .filter(role => roles.get(role).interactive === false);
/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with a non-interactive component. Non-interactive roles
 * include `listitem`, `article`, or `dialog`. These are roles that indicate
 * for the most part containers.
 *
 * Elements with these roles should not respond or handle user interactions.
 * For example, an `onClick` handler should not be assigned to an element with
 * the role `listitem`. An element inside the `listitem`, like a button or a
 * link, should handle the click.
 *
 * This utility returns true for elements that are assigned a non-interactive
 * role. It will return false for elements that do not have a role. So whereas
 * a `div` might be considered non-interactive, for the purpose of this utility,
 * it is considered neither interactive nor non-interactive -- a determination
 * cannot be made in this case and false is returned.
 */
const isNonInteractiveRole = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if ([...dom.keys()].indexOf(tagName) === -1) {
    return false;
  }

  const value = getLiteralPropValue(getProp(attributes, 'role'));

  // If value is undefined, then the role attribute will be dropped in the DOM.
  // If value is null, then getLiteralAttributeValue is telling us that the
  // value isn't in the form of a literal
  if (value === undefined || value === null) {
    return false;
  }

  const normalizedValues = String(value).toUpperCase().split(' ');
  const isNonInteractive = normalizedValues.every(
    val => VALID_ROLES.indexOf(val) > -1,
  );

  return isNonInteractive;
};

export default isNonInteractiveRole;
