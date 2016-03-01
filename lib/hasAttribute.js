'use strict';

const hasAttribute = (attributes, attribute) => {
  let idx = 0;

  const hasAttr = attributes.some((attr, index) => {
    // If the attributes contain a spread attribute, then skip.
    if (attr.type === 'JSXSpreadAttribute') {
      return false;
    }

    // Normalize.
    if (attr.name.name.toUpperCase() === attribute.toUpperCase()) {
      idx = index; // Keep track of the index.
      return true;
    }

    return false;
  });

  return hasAttr ? attributes[idx] : false;
};

export default hasAttribute;
