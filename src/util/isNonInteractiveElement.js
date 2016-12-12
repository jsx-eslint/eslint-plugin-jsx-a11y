import DOMElements from './attributes/DOM.json';
import { interactiveElementsMap } from './isInteractiveElement';

/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an non-interactive element, such as a container
 * or context-providing role like table or menu. Used to positively identify
 * elements that should not be placed in the tab ring on a page.
 */
const isNonInteractiveElement = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return false;
  }

  // Divs and spans have neither an interactive nor a non-interactive nature.
  if (['div', 'span'].indexOf(tagName) > -1) {
    return false;
  }

  if ({}.hasOwnProperty.call(interactiveElementsMap, tagName) === false) {
    return true;
  }

  return !interactiveElementsMap[tagName](attributes);
};

export default isNonInteractiveElement;
