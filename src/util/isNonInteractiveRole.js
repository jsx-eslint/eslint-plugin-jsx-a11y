import { getProp, getPropValue } from 'jsx-ast-utils';
import DOMElements from './attributes/DOM.json';
import { interactiveRoles } from './isInteractiveRole';

/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an non-interactive component, such as a container
 * or context-providing role like table or menu. Used to positively identify
 * elements that should not be placed in the tab ring on a page.
 *
 * isNonInteractiveRole is a Logical Conjuction:
 * https://en.wikipedia.org/wiki/Logical_conjunction
 * The JSX element has a tagName and a role attribute with a value in the set
 * of non-interactive roles.
 */
const isNonInteractiveRole = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return false;
  }

  let role = getPropValue(getProp(attributes, 'role'));

  if (role == null) {
    return false;
  }

  if (typeof role === 'string') {
    role = role.toLowerCase();
  }

  return (interactiveRoles.indexOf(role) === -1);
};

export default isNonInteractiveRole;
