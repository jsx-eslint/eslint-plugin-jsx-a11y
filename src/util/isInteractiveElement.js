/**
 * @flow
 */
import {
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

const interactiveRoles = new Set(
  [...roles.keys()]
    .filter(name => !roles.get(name).abstract)
    .filter(name => roles.get(name).superClass.some(
      klasses => klasses.includes('widget')),
    ),
);

// Map of tagNames to functions that return whether that element is interactive or not.
const pureInteractiveRoleElements = [...elementRoles.entries()]
  .reduce((
    accumulator: ElementCallbackMap,
    [
      elementSchema,
      roleSet,
    ],
  ): ElementCallbackMap => {
    const interactiveElements = accumulator;
    const elementName = elementSchema.name;
    const elementAttributes = elementSchema.attributes || new Map([]);
    interactiveElements[elementName] = (attributes: Array<Node>): boolean => {
      const passedAttrCheck =
        elementAttributes.size === 0 ||
        [...elementAttributes.values()].every(
          (controlAttr): boolean => attributes.some(
            (attr): boolean => (
              controlAttr.name === propName(attr).toLowerCase()
              && controlAttr.value === getLiteralPropValue(attr)
            ),
          ),
        );
      // [].some is used here because some elements are associated with both
      // interactive and non-interactive roles. Like select, which is
      // associated with combobox and listbox.
      return passedAttrCheck && [...roleSet.keys()].some(
        (roleName): boolean => interactiveRoles.has(roleName),
      );
    };
    return interactiveElements;
  }, {});

const isLink = function isLink(attributes) {
  const href = getPropValue(getProp(attributes, 'href'));
  const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));
  return href !== undefined || tabIndex !== undefined;
};

export const interactiveElementsMap = {
  ...pureInteractiveRoleElements,
  a: isLink,
  area: isLink,
  input: (attributes) => {
    const typeAttr = getLiteralPropValue(getProp(attributes, 'type'));
    return typeAttr ? typeAttr.toUpperCase() !== 'HIDDEN' : true;
  },
  // Although this is associated with an interactive role, it should not be
  // considered interactive in HTML.
  link: () => false,
  td: attributes => getLiteralPropValue(
    getProp(attributes, 'role'),
  ) === 'gridcell',
  table: (attributes) => {
    const role = getLiteralPropValue(
      getProp(attributes, 'role'),
    );
    return (role === 'grid');
  },
};

/**
 * Returns boolean indicating whether the given element is
 * interactive on the DOM or not. Usually used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with on the DOM.
 */
const isInteractiveElement = (
  tagName: string,
  attributes: Array<Node>,
): boolean => {
  if ({}.hasOwnProperty.call(interactiveElementsMap, tagName) === false) {
    return false;
  }

  return interactiveElementsMap[tagName](attributes);
};

export default isInteractiveElement;
