'use strict';

import hasAttribute from './hasAttribute';
import getAttributeValue from './getAttributeValue';

/**
 * Returns boolean indicating that the aria-hidden prop
 * is present or the value is true.
 *
 * <div aria-hidden /> is equivalent to the DOM as <div aria-hidden=true />.
 */
const isHiddenFromScreenReader = attributes => {
  const ariaHidden = getAttributeValue(hasAttribute(attributes, 'aria-hidden'));
  return ariaHidden === true || ariaHidden === null;
};

export default isHiddenFromScreenReader;
