'use strict';

module.exports = function isHiddenFromScreenReader(attributes) {
  return attributes.some(function(attribute) {
    var name = attribute.name.name.toUpperCase();
    var value = attribute.value && attribute.value.value;

    return name === 'ARIA-HIDDEN' && (value === true || value === null);
  });
};
