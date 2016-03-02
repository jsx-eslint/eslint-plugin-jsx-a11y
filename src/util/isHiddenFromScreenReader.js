'use strict';

import hasAttribute from './hasAttribute';

/**
 * Returns boolean indicating that the aria-hidden prop
 * is present or the value is true.
 *
 * <div aria-hidden /> is equivalent to the DOM as <div aria-hidden=true />.
 */
const isHiddenFromScreenReader = attributes => {
  const hasAriaHidden = hasAttribute(attributes, 'aria-hidden');
  return hasAriaHidden && (hasAriaHidden === true || hasAriaHidden === null);
};

export default isHiddenFromScreenReader;
