'use strict';

import hasAttribute from './hasAttribute';
import getAttributeValue from './getAttributeValue';
import DOMElements from './attributes/DOM';

const interactiveMap = {
  a: attributes => {
    const hasHref = hasAttribute(attributes, 'href');
    const hasTabIndex = hasAttribute(attributes, 'tabIndex');
    return (Boolean(hasHref) || !hasHref && Boolean(hasTabIndex));
  },
  button: () => true,
  input: attributes => {
    const typeAttr = getAttributeValue(hasAttribute(attributes, 'type'));
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
  if (DOMElements.indexOf(tagName) === -1) {
    return true;
  }

  if (interactiveMap.hasOwnProperty(tagName) === false) {
    return false;
  }

  return interactiveMap[tagName](attributes);
};

export default isInteractiveElement;
