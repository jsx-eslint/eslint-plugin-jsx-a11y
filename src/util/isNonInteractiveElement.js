/**
 * @flow
 */

import {
  dom,
  elementRoles,
  roles,
} from 'aria-query';
import type { Node } from 'ast-types-flow';
import {
  getProp,
  getPropValue,
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';
import getTabIndex from './getTabIndex';

type ElementCallbackMap = {
  [elementName: string]: (attributes: Array<Node>) => boolean,
};

const nonInteractiveRoles = new Set(
  [...roles.keys()]
    .filter(name => !roles.get(name).abstract)
    .filter(name => !roles.get(name).superClass.some(
      klasses => klasses.includes('widget')),
    ),
);

const pureNonInteractiveElements = [...elementRoles.entries()]
  .reduce((
    accumulator: ElementCallbackMap,
    [
      elementSchema,
      roleSet,
    ],
  ): ElementCallbackMap => {
    const nonInteractiveElements = accumulator;
    const elementName = elementSchema.name;
    const elementAttributes = elementSchema.attributes || [];
    nonInteractiveElements[elementName] = (attributes: Array<Object>): boolean => {
      const passedAttrCheck =
        elementAttributes.length === 0 ||
        elementAttributes.every(
          (controlAttr): boolean => attributes.some(
            (attr): boolean => (
              controlAttr.name === propName(attr).toLowerCase()
              && controlAttr.value === getLiteralPropValue(attr)
            ),
          ),
        );
      return passedAttrCheck && [...roleSet.keys()].every(
        (roleName): boolean => nonInteractiveRoles.has(roleName),
      );
    };
    return nonInteractiveElements;
  }, {});

const isNotLink = function isNotLink(attributes) {
  const href = getPropValue(getProp(attributes, 'href'));
  const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));
  return href === undefined && tabIndex === undefined;
};

export const nonInteractiveElementsMap = {
  ...pureNonInteractiveElements,
  a: isNotLink,
  area: isNotLink,
  input: (attributes) => {
    const typeAttr = getLiteralPropValue(getProp(attributes, 'type'));
    return typeAttr ? typeAttr.toLowerCase() === 'hidden' : false;
  },
  table: (attributes) => {
    const roleAttr = getLiteralPropValue(getProp(attributes, 'role'));
    return roleAttr ? roleAttr.toLowerCase() !== 'grid' : true;
  },
  td: (attributes) => {
    const roleAttr = getLiteralPropValue(getProp(attributes, 'role'));
    return roleAttr ? roleAttr.toLowerCase() !== 'gridcell' : true;
  },
};

/**
 * Returns boolean indicating whether the given element is a non-interactive
 * element. If the element has either a non-interactive role assigned or it
 * is an element with an inherently non-interactive role, then this utility
 * returns true. Elements that lack either an explicitly assigned role or
 * an inherent role are not considered. For those, this utility returns false
 * because a positive determination of interactiveness cannot be determined.
 */
const isNonInteractiveElement = (
  tagName: string,
  attributes: Array<Node>,
): boolean => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if ([...dom.keys()].indexOf(tagName) === -1) {
    return false;
  }

  // The element does not have an explicit role, determine if it has an
  // inherently non-interactive role.
  if ({}.hasOwnProperty.call(nonInteractiveElementsMap, tagName) === false) {
    return false;
  }

  return nonInteractiveElementsMap[tagName](attributes);
};

export default isNonInteractiveElement;
