'use strict';

var hasAttribute = require('./hasAttribute');

var interactiveMap = {
  a: function(attributes) {
    var hasHref = hasAttribute(attributes, 'href');
    var hasTabIndex = hasAttribute(attributes, 'tabIndex');
    return (Boolean(hasHref) || !hasHref && Boolean(hasTabIndex));
  },
  button: function() {
    return true;
  },
  input: function(attributes) {
    var hasTypeAttr = hasAttribute(attributes, 'type');
    return hasTypeAttr ? hasTypeAttr.value.value.toUpperCase() !== 'HIDDEN' : true;
  },
  option: function() {
    return true;
  },
  select: function() {
    return true;
  },
  textarea: function() {
    return true;
  }
};

module.exports = function isInteractiveElement(tagName, attributes) {
  if (interactiveMap.hasOwnProperty(tagName) === false) {
    return false;
  }

  return interactiveMap[tagName](attributes);
};
