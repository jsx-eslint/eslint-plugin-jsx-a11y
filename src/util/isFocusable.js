import { getProp } from 'jsx-ast-utils';
import getTabIndex from './getTabIndex';
import isInteractiveElement from './isInteractiveElement';

/**
 * Returns boolean indicating whether an element appears in tab focus.
 * Identifies an element as focusable if it is an interactive element, or an element with a tabIndex greater than or equal to 0.
 */
function isFocusable(type, attributes) {
  const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));
  if (isInteractiveElement(type, attributes)) {
    return (tabIndex === undefined || tabIndex >= 0);
  }
  return tabIndex >= 0;
}

export default isFocusable;
