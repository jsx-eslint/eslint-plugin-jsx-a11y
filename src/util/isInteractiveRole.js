import {
  roles,
} from 'aria-query';
import type { Node } from 'ast-types-flow';
import { getProp, getLiteralPropValue } from 'jsx-ast-utils';

const interactiveRoles = [...roles.keys()]
  .filter(name => !roles.get(name).abstract)
  .filter(name => roles.get(name).superClass.some(
    klasses => klasses.includes('widget')),
  );

// 'toolbar' does not descend from widget, but it does support
// aria-activedescendant, thus in practice we treat it as a widget.
interactiveRoles.push('toolbar');
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
  attributes: Array<Node>,
): boolean => {
  const value = getLiteralPropValue(getProp(attributes, 'role'));

  // If value is undefined, then the role attribute will be dropped in the DOM.
  // If value is null, then getLiteralAttributeValue is telling us that the
  // value isn't in the form of a literal
  if (value === undefined || value === null) {
    return false;
  }

  let isInteractive = false;
  const normalizedValues = String(value).toLowerCase().split(' ');
  if (normalizedValues.length > 0) {
    // The last role value is a series takes precedence.
    const val = normalizedValues[normalizedValues.length - 1];
    isInteractive = interactiveRoles.indexOf(val) > -1;
  }

  return isInteractive;
};

export default isInteractiveRole;
