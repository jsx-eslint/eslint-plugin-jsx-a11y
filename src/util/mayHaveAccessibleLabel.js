/**
 * Returns true if a labelling element is found or if it cannot determine if
 * a label is present because of expression containers or spread attributes.
 * A false return value means that the node definitely does not have a label,
 * but a true return return value means that the node may or may not have a
 * label.
 *
 * @flow
 */

import includes from 'array-includes';
import { getPropValue, propName, elementType as rawElementType } from 'jsx-ast-utils';
import type { JSXOpeningElement, Node } from 'ast-types-flow';
import minimatch from 'minimatch';

function tryTrim(value: any) {
  return typeof value === 'string' ? value.trim() : value;
}

function hasLabellingProp(
  openingElement: JSXOpeningElement,
  additionalLabellingProps?: Array<string> = [],
) {
  const labellingProps = [].concat(
    'alt', // Assume alt is used correctly on an image
    'aria-label',
    'aria-labelledby',
    additionalLabellingProps,
  );
  return openingElement.attributes.some((attribute): boolean => {
    // We must assume that a spread value contains a labelling prop.
    if (attribute.type !== 'JSXAttribute') {
      return true;
    }
    // Attribute matches.
    if (
      includes(labellingProps, propName(attribute))
      && !!tryTrim(getPropValue(attribute))
    ) {
      return true;
    }
    return false;
  });
}

export default function mayHaveAccessibleLabel(
  root: Node,
  maxDepth: number = 1,
  additionalLabellingProps?: Array<string> = [],
  getElementType: ((node: JSXOpeningElement) => string) = rawElementType,
  controlComponents: Array<string> = [],
): boolean {
  function checkElement(
    node: Node,
    depth: number,
  ): boolean {
    // Bail when maxDepth is exceeded.
    if (depth > maxDepth) {
      return false;
    }
    // Check for literal text.
    if (node.type === 'Literal' && !!tryTrim(node.value)) {
      return true;
    }
    // Assume an expression container renders a label. It is the best we can
    // do in this case.
    if (node.type === 'JSXExpressionContainer') {
      return true;
    }
    // Check for JSXText.
    // $FlowFixMe Remove after updating ast-types-flow
    if (node.type === 'JSXText' && !!tryTrim(node.value)) {
      return true;
    }
    // Check for labelling props.
    if (
      node.openingElement
      /* $FlowFixMe */
      && hasLabellingProp(node.openingElement, additionalLabellingProps)
    ) {
      return true;
    }

    if (node.type === 'JSXElement' && node.children.length === 0 && node.openingElement) {
      // $FlowFixMe `node.openingElement` has `unknown` type
      const name = getElementType(node.openingElement);
      const isReactComponent = name.length > 0 && name[0] === name[0].toUpperCase();

      if (
        isReactComponent
        && !controlComponents.some((control) => minimatch(name, control))
      ) {
        return true;
      }
    }

    // Recurse into the child element nodes.
    if (node.children) {
      /* $FlowFixMe */
      for (let i = 0; i < node.children.length; i += 1) {
        /* $FlowFixMe */
        if (checkElement(node.children[i], depth + 1)) {
          return true;
        }
      }
    }
    return false;
  }
  return checkElement(root, 0);
}
