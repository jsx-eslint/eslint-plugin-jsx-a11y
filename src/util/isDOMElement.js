/**
 * @flow
 */
import { dom } from 'aria-query';
import includes from 'array-includes';

const domElements = [...dom.keys()];

/**
 * Returns boolean indicating whether the given element is a DOM element.
 */
const isDOMElement = (
  tagName: string,
): boolean => includes(domElements, tagName);

export default isDOMElement;
