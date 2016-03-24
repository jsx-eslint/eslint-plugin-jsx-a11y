'use strict';

/**
 * Returns the value of the child element or false, indicating the child element
 * is not present on the JSX opening element.
 *
 * This treats undefined values as missing props, as they will not be used for
 * rendering on elements that live closest to the DOM (pure html JSX elements).
 */
const hasChild = (children, target) => (
  children.some(child => child.openingElement.name.name === target && child.children.length > 0)
);

export default hasChild;
