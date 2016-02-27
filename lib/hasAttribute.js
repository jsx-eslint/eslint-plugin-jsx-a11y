'use strict';

module.exports = function hasAttribute(attributes, attribute, strictSpread) {
  var strict = strictSpread || false;
  var idx = 0;

  var hasAttr = attributes.some(function(attr, index) {
    // If the attributes contain a spread attribute, then follow strictSpread.
    if (attr.type === 'JSXSpreadAttribute') {
      return !strict;
    }
    if (attr.name.name.toUpperCase() === attribute.toUpperCase()) {
      idx = index; // Keep track of the index.
      return true;
    }
    return false;
  });

  return hasAttr ? attributes[idx] : false;
};
