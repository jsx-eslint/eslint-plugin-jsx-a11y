'use strict';

import hasAttribute from './hasAttribute';

const interactiveMap = {
  a: attributes => {
    const hasHref = hasAttribute(attributes, 'href');
    const hasTabIndex = hasAttribute(attributes, 'tabIndex');
    return (Boolean(hasHref) || !hasHref && Boolean(hasTabIndex));
  },
  button: () => true,
  input: attributes => {
    const hasTypeAttr = hasAttribute(attributes, 'type');
    return hasTypeAttr ? hasTypeAttr.toUpperCase() !== 'HIDDEN' : true;
  },
  option: () => true,
  select: () => true,
  textarea: () => true
};

const isInteractiveElement = (tagName, attributes) => {
  if (interactiveMap.hasOwnProperty(tagName) === false) {
    return false;
  }

  return interactiveMap[tagName](attributes);
};

export default isInteractiveElement;
