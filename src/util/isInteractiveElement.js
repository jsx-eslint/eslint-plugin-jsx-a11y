'use strict';

import getAttribute from './getAttribute';
import getAttributeValue, { getLiteralAttributeValue } from './getAttributeValue';
import DOMElements from './attributes/DOM';



// Map of tagNames to functions that return whether that element is interactive or not.
const interactiveMap = {
  a: attributes => {
    const href = getAttributeValue(getAttribute(attributes, 'href'));
    const tabIndex = getAttributeValue(getAttribute(attributes, 'tabIndex'));
    return Boolean(href) || !isNaN(Number(tabIndex));
  },
  // This is same as `a` interactivity function
  area: attributes => interactiveMap.a(attributes),
  button: () => true,
  input: attributes => {
    const typeAttr = getLiteralAttributeValue(getAttribute(attributes, 'type'));
    return typeAttr ? typeAttr.toUpperCase() !== 'HIDDEN' : true;
  },
  option: () => true,
  select: () => true,
  textarea: () => true
};

/**
 * Returns boolean indicating whether the given element is
 * interactive on the DOM or not. Usually used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with on the DOM.
 */
const isInteractiveElement = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return true;
  }

  if (interactiveMap.hasOwnProperty(tagName) === false) {
    return false;
  }

  return interactiveMap[tagName](attributes);
};

export default isInteractiveElement;
