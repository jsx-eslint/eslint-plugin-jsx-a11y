import { getProp, getPropValue } from 'jsx-ast-utils';
import DOMElements from './attributes/DOM.json';
import isInteractiveElement from '../util/isInteractiveElement';

// ARIA roles that denote user interaction support.
export const interactiveRoles = [
  'button',
  'checkbox',
  'link',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'spinbutton',
  'tab',
  'textbox',
];

/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an interactive component. Used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with in the DOM.
 *
 * isInteractiveRole is a Logical Disjunction:
 * https://en.wikipedia.org/wiki/Logical_disjunction
 * The JSX element does not have a tagName or it has a tagName and a role
 * attribute with a value in the set of non-interactive roles.
 */
const isInteractiveRole = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return true;
  }

  let role = getPropValue(getProp(attributes, 'role'));

  if (role == null) {
    return false;
  }

  if (typeof role === 'string') {
    role = role.toLowerCase();
  }

  return (interactiveRoles.indexOf(role) > -1);
};

export default isInteractiveRole;
