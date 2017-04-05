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
import {
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';

const roleKeys = [...roles.keys()];

const nonInteractiveRoles = new Set(
  roleKeys
    .filter(name => !roles.get(name).abstract)
    .filter(name => !roles.get(name).superClass.some(
      klasses => klasses.includes('widget')),
    ),
);

const interactiveRoles = new Set(
    [].concat(
      roleKeys,
      // 'toolbar' does not descend from widget, but it does support
      // aria-activedescendant, thus in practice we treat it as a widget.
      'toolbar',
    )
    .filter(name => !roles.get(name).abstract)
    .filter(name => roles.get(name).superClass.some(
      klasses => klasses.includes('widget')),
    ),
);


const nonInteractiveElementRoles = [...elementRoles.entries()]
  .reduce((
    accumulator,
    [
      elementSchema,
      roleSet,
    ],
  ) => {
    if ([...roleSet.keys()].every(
      (role): boolean => nonInteractiveRoles.has(role),
    )) {
      accumulator.set(elementSchema, roleSet);
    }
    return accumulator;
  }, new Map([]));

const interactiveElementRoles = [...elementRoles.entries()]
  .reduce((
    accumulator,
    [
      elementSchema,
      roleSet,
    ],
  ) => {
    if ([...roleSet.keys()].some(
      (role): boolean => interactiveRoles.has(role),
    )) {
      accumulator.set(elementSchema, roleSet);
    }
    return accumulator;
  }, new Map([]));

const interactiveAXObjects = new Set(
  [...AXObjects.keys()]
    .filter(name => ['widget'].includes(AXObjects.get(name).type)),
);

const interactiveElementAXObjects = [...elementAXObjects.entries()]
  .reduce((
    accumulator,
    [
      elementSchema,
      AXObjectSet,
    ],
  ) => {
    if ([...AXObjectSet.keys()].every(
      (role): boolean => interactiveAXObjects.has(role),
    )) {
      accumulator.set(elementSchema, AXObjectSet);
    }
    return accumulator;
  }, new Map([]));

function attributesComparator(baseAttributes = [], attributes = []): boolean {
  return baseAttributes.every(
    (baseAttr): boolean => attributes.some(
      (attribute): boolean => {
        let attrMatches = false;
        let valueMatches = true;
        // Attribute matches.
        if (baseAttr.name === propName(attribute).toLowerCase()) {
          attrMatches = true;
        }
        // Value exists and matches.
        if (baseAttr.value) {
          valueMatches = baseAttr.value === getLiteralPropValue(attribute);
        }
        // attribute.type === 'JSXAttribute'
        return attrMatches && valueMatches;
      },
    ),
  );
}

function checkIsInteractiveElement(tagName, attributes): boolean {
  // Check in configuration for an override.

  // Check in elementRoles for inherent interactive role associations for
  // this element.
  for (const [elementSchema] of interactiveElementRoles) {
    if (
      tagName === elementSchema.name
      && attributesComparator(elementSchema.attributes, attributes)
    ) {
      return true;
    }
  }

  // Check in elementRoles for inherent interactive role associations for
  // this element.
  for (const [elementSchema] of nonInteractiveElementRoles) {
    if (
      tagName === elementSchema.name
      && attributesComparator(elementSchema.attributes, attributes)
    ) {
      return false;
    }
  }

  // Check in elementAXObjects for AX Tree associations for this elements.
  for (const [elementSchema] of interactiveElementAXObjects) {
    if (tagName === elementSchema.name) {
      return attributesComparator(elementSchema.attributes, attributes);
    }
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
  if ([...dom.keys()].indexOf(tagName) === -1) {
    return false;
  }

  return checkIsInteractiveElement(tagName, attributes);
};

export default isInteractiveElement;
