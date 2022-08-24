// @flow

import type { JSXElement, JSXOpeningElement, Node } from 'ast-types-flow';

import { getProp, getLiteralPropValue } from 'jsx-ast-utils';

import isHiddenFromScreenReader from './isHiddenFromScreenReader';

/**
 * Returns a new "standardized" string: all whitespace is collapsed to one space,
 * and the string is lowercase
 * @param {string} input
 * @returns lowercase, single-spaced, punctuation-stripped, trimmed string
 */
function standardizeSpaceAndCase(input: string): string {
  return input
    .trim()
    .replace(/[,.?¿!‽¡;:]/g, '') // strip punctuation
    .replace(/\s\s+/g, ' ') // collapse spaces
    .toLowerCase();
}

/**
 * Returns the (recursively-defined) accessible child text of a node, which (in-order) is:
 * 1. The element's aria-label
 * 2. If the element is a direct literal, the literal value
 * 3. Otherwise, merge all of its children
 * @param {JSXElement} node - node to traverse
 * @returns child text as a string
 */
export default function getAccessibleChildText(node: JSXElement, elementType: (JSXOpeningElement) => string): string {
  const ariaLabel = getLiteralPropValue(getProp(node.openingElement.attributes, 'aria-label'));
  // early escape-hatch when aria-label is applied
  if (ariaLabel) return standardizeSpaceAndCase(ariaLabel);

  // early-return if alt prop exists and is an image
  const altTag = getLiteralPropValue(getProp(node.openingElement.attributes, 'alt'));
  if (elementType(node.openingElement) === 'img' && altTag) return standardizeSpaceAndCase(altTag);

  // skip if aria-hidden is true
  if (
    isHiddenFromScreenReader(
      elementType(node.openingElement),
      node.openingElement.attributes,
    )
  ) {
    return '';
  }

  const rawChildText = node.children
    .map((currentNode: Node): string => {
      // $FlowFixMe JSXText is missing in ast-types-flow
      if (currentNode.type === 'Literal' || currentNode.type === 'JSXText') {
        return String(currentNode.value);
      }
      if (currentNode.type === 'JSXElement') {
        return getAccessibleChildText(currentNode, elementType);
      }
      return '';
    }).join(' ');

  return standardizeSpaceAndCase(rawChildText);
}
