'use strict';

import getAttributeValue from './getAttributeValue';

const hasAttribute = (attributes, attribute) => {
  let value = false;

  const hasAttr = attributes.some(attr => {
    // If the attributes contain a spread attribute, then skip.
    if (attr.type === 'JSXSpreadAttribute') {
      return false;
    }

    // Normalize.
    if (attr.name.name.toUpperCase() === attribute.toUpperCase()) {
      value = getAttributeValue(attr);

      // If the value is undefined, it doesn't really have the attribute.
      return value !== undefined;
    }

    return false;
  });

  return hasAttr ? value : false;
};

export default hasAttribute;
