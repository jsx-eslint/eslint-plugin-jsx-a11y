'use strict';

import getAttributeValue from './getAttributeValue';

/**
 * Returns the value of the attribute or false, indicating the attribute
 * is not present on the JSX opening element. This skips over spread attributes
 * as the purpose of this linter is to do hard checks of explicit JSX props.
 *
 * This treats undefined values as missing props, as they will not be used for
 * rendering on elements that live closest to the DOM (pure html JSX elements).
 */
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
