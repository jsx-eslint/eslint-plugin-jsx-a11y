'use strict';

/**
 * Returns the JSXAttribute itself or undefined, indicating the attribute
 * is not present on the JSXOpeningElement. This skips over spread attributes
 * as the purpose of this linter is to do hard checks of explicit JSX props.
 *
 */
const getAttribute = (attributesOnNode, ...attributesToCheck) => {
  let nodeAttribute = undefined;

  // Normalize.
  const comparators = attributesToCheck.map(attribute => attribute.toUpperCase());

  const hasAttr = attributesOnNode.some(attr => {
    // If the attributes contain a spread attribute, then skip.
    if (attr.type === 'JSXSpreadAttribute') {
      return false;
    }

    // Normalize.
    if (comparators.indexOf(attr.name.name.toUpperCase()) > -1) {
      nodeAttribute = attr;
      return true;
    }

    return false;
  });

  return hasAttr ? nodeAttribute : undefined;
};

export default getAttribute;
