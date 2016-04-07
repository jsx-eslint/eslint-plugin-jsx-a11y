'use strict';

import hasAttribute from './hasAttribute';
import getAttributeValue from './getAttributeValue';

const DOMElements = [
  "a", "abbr", "address", "area", "article",
  "aside", "audio", "b", "base", "bdi", "bdo", "big",
  "blockquote", "body", "br", "button", "canvas", "caption",
  "cite", "code", "col", "colgroup", "data", "datalist",
  "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt",
  "em", "embed", "fieldset", "figcaption", "figure", "footer",
  "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header",
  "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins",
  "kbd", "keygen", "label", "legend", "li", "link", "main", "map",
  "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript",
  "object", "ol", "optgroup", "option", "output", "p", "param",
  "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s",
  "samp", "script", "section", "select", "small", "source", "span",
  "strong", "style", "sub", "summary", "sup", "table", "tbody",
  "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr",
  "track", "u", "ul", "var", "video", "wbr"
];

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
