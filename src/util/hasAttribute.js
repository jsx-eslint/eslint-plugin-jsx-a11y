'use strict';


/**
 * Returns the JSXAttribute itself or false, indicating the attribute
 * is not present on the JSXOpeningElement. This skips over spread attributes
 * as the purpose of this linter is to do hard checks of explicit JSX props.
 *
 */
const hasAttribute = (attributes, attribute) => {
  let nodeAttribute = undefined;

  const hasAttr = attributes.some(attr => {
    // If the attributes contain a spread attribute, then skip.
    if (attr.type === 'JSXSpreadAttribute') {
      return false;
    }

    // Normalize.
    if (attr.name.name.toUpperCase() === attribute.toUpperCase()) {
      nodeAttribute = attr;
      return true;
    }

    return false;
  });

  return hasAttr ? nodeAttribute : false;
};

export default hasAttribute;
