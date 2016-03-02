'use strict';

import hasAttribute from './hasAttribute';

const isHiddenFromScreenReader = attributes => {
  const hasAriaHidden = hasAttribute(attributes, 'aria-hidden');
  return hasAriaHidden && (hasAriaHidden === true || hasAriaHidden === null);
};

export default isHiddenFromScreenReader;
