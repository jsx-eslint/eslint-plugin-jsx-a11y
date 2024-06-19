/**
 * @flow
 */

import {
  dom,
  elementRoles,
  roles,
} from 'aria-query';
import {
  AXObjects,
  elementAXObjects,
} from 'axobject-query';
import type { Node } from 'ast-types-flow';
import includes from 'array-includes';
import flatMap from 'array.prototype.flatmap';
import iterFrom from 'es-iterator-helpers/Iterator.from';
// import iterFlatMap from 'es-iterator-helpers/Iterator.prototype.flatMap';
import filter from 'es-iterator-helpers/Iterator.prototype.filter';
import some from 'es-iterator-helpers/Iterator.prototype.some';

import attributesComparator from './attributesComparator';

const roleKeys = [...roles.keys()];
const elementRoleEntries = [...elementRoles];

const nonInteractiveRoles = new Set(roleKeys
  .filter((name) => {
    const role = roles.get(name);
    return (
      !role.abstract
        // 'toolbar' does not descend from widget, but it does support
        // aria-activedescendant, thus in practice we treat it as a widget.
        && name !== 'toolbar'
        // This role is meant to have no semantic value.
        // @see https://www.w3.org/TR/wai-aria-1.2/#generic
        && name !== 'generic'
        && !role.superClass.some((classes) => includes(classes, 'widget'))
    );
  }).concat(
    // The `progressbar` is descended from `widget`, but in practice, its
    // value is always `readonly`, so we treat it as a non-interactive role.
    'progressbar',
  ));

const interactiveRoles = new Set(roleKeys
  .filter((name) => {
    const role = roles.get(name);
    return (
      !role.abstract
      // The `progressbar` is descended from `widget`, but in practice, its
      // value is always `readonly`, so we treat it as a non-interactive role.
        && name !== 'progressbar'
        // This role is meant to have no semantic value.
        // @see https://www.w3.org/TR/wai-aria-1.2/#generic
        && name !== 'generic'
        && role.superClass.some((classes) => includes(classes, 'widget'))
    );
  }).concat(
    // 'toolbar' does not descend from widget, but it does support
    // aria-activedescendant, thus in practice we treat it as a widget.
    'toolbar',
  ));

// TODO: convert to use iterFlatMap and iterFrom
const interactiveElementRoleSchemas = flatMap(
  elementRoleEntries,
  ([elementSchema, rolesArr]) => (rolesArr.some((role): boolean => interactiveRoles.has(role)) ? [elementSchema] : []),
);

// TODO: convert to use iterFlatMap and iterFrom
const nonInteractiveElementRoleSchemas = flatMap(
  elementRoleEntries,
  ([elementSchema, rolesArr]) => (rolesArr.every((role): boolean => nonInteractiveRoles.has(role)) ? [elementSchema] : []),
);

const nonInteractiveAXObjects = new Set(filter(iterFrom(AXObjects.keys()), (name) => includes(['window', 'structure'], AXObjects.get(name).type)));

// TODO: convert to use iterFlatMap and iterFrom
const nonInteractiveElementAXObjectSchemas = flatMap(
  [...elementAXObjects],
  ([elementSchema, AXObjectsArr]) => (AXObjectsArr.every((role): boolean => nonInteractiveAXObjects.has(role)) ? [elementSchema] : []),
);

function checkIsNonInteractiveElement(tagName, attributes): boolean {
  function elementSchemaMatcher(elementSchema) {
    return (
      tagName === elementSchema.name
      && attributesComparator(elementSchema.attributes, attributes)
    );
  }
  // Check in elementRoles for inherent non-interactive role associations for
  // this element.
  const isInherentNonInteractiveElement = some(iterFrom(nonInteractiveElementRoleSchemas), elementSchemaMatcher);
  if (isInherentNonInteractiveElement) {
    return true;
  }
  // Check in elementRoles for inherent interactive role associations for
  // this element.
  const isInherentInteractiveElement = some(iterFrom(interactiveElementRoleSchemas), elementSchemaMatcher);
  if (isInherentInteractiveElement) {
    return false;
  }
  // Check in elementAXObjects for AX Tree associations for this element.
  const isNonInteractiveAXElement = some(iterFrom(nonInteractiveElementAXObjectSchemas), elementSchemaMatcher);
  if (isNonInteractiveAXElement) {
    return true;
  }

  return false;
}

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
  if (!dom.has(tagName)) {
    return false;
  }
  // <header> elements do not technically have semantics, unless the
  // element is a direct descendant of <body>, and this plugin cannot
  // reliably test that.
  // @see https://www.w3.org/TR/wai-aria-practices/examples/landmarks/banner.html
  if (tagName === 'header') {
    return false;
  }

  return checkIsNonInteractiveElement(tagName, attributes);
};

export default isNonInteractiveElement;
