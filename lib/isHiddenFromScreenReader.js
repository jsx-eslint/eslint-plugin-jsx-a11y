'use strict';

const isHiddenFromScreenReader = attributes => (
  attributes.some(attribute => {
    if (attribute.type === 'JSXSpreadAttribute') {
      return false;
    }

    const name = attribute.name.name.toUpperCase();
    const value = attribute.value && attribute.value.value;

    return name === 'ARIA-HIDDEN' && (value === true || value === null);
  })
);

export default isHiddenFromScreenReader;
