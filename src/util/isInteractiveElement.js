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
  AXObjects,
  elementAXObjects,
} from 'axobject-query';
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

const interactiveAXObjects = new Set(filter(iterFrom(AXObjects.keys()), (name) => AXObjects.get(name).type === 'widget'));

// TODO: convert to use iterFlatMap and iterFrom
const interactiveElementAXObjectSchemas = flatMap(
  [...elementAXObjects],
  ([elementSchema, AXObjectsArr]) => (AXObjectsArr.every((role): boolean => interactiveAXObjects.has(role)) ? [elementSchema] : []),
);

function checkIsInteractiveElement(tagName, attributes): boolean {
  function elementSchemaMatcher(elementSchema) {
    return (
      tagName === elementSchema.name
      && attributesComparator(elementSchema.attributes, attributes)
    );
  }

  // TODO: remove this when aria-query and axobject-query are upgraded
  if (tagName === 'summary') {
    return false;
  }

  // Check in elementRoles for inherent interactive role associations for
  // this element.
  const isInherentInteractiveElement = some(iterFrom(interactiveElementRoleSchemas), elementSchemaMatcher);
  if (isInherentInteractiveElement) {
    return true;
  }
  // Check in elementRoles for inherent non-interactive role associations for
  // this element.
  const isInherentNonInteractiveElement = some(iterFrom(nonInteractiveElementRoleSchemas), elementSchemaMatcher);
  if (isInherentNonInteractiveElement) {
    return false;
  }
  // Check in elementAXObjects for AX Tree associations for this element.
  const isInteractiveAXElement = some(iterFrom(interactiveElementAXObjectSchemas), elementSchemaMatcher);
  if (isInteractiveAXElement) {
    return true;
  }

  return false;
}

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
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (!dom.has(tagName)) {
    return false;
  }

  return checkIsInteractiveElement(tagName, attributes);
};

export default isInteractiveElement;
