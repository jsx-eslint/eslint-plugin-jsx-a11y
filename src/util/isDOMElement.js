/**
 * @flow
 */
import { dom } from 'aria-query';

/**
 * Returns boolean indicating whether the given element is a DOM element.
 */
const isDOMElement = (
  tagName: string,
): boolean => dom.has(tagName);

export default isDOMElement;
