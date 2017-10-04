/**
 * @flow
 */

import {
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';
import type { Node } from 'ast-types-flow';

/**
 * Returns true if all items in baseAttributes are found in attributes. Always
 * returns true if baseAttributes is empty.
 */
function attributesComparator(
  baseAttributes: Array<{[key: string]: mixed}> = [],
  attributes: Array<Node> = [],
): boolean {
  return baseAttributes.every(
    (baseAttr): boolean => attributes.some(
      (attribute): boolean => {
        // Guard against non-JSXAttribute nodes like JSXSpreadAttribute
        if (attribute.type !== 'JSXAttribute') {
          return false;
        }
        // Attribute matches.
        if (baseAttr.name !== propName(attribute)) {
          return false;
        }
        // Value exists and does not match.
        if (
          /*
          baseAttr.value !== null &&
          baseAttr.value !== false &&
          baseAttr.value !== undefined &&
          baseAttr.value !== '' &&
          baseAttr.value !== 0 &&
          Object.prototype.hasOwnProperty.call(baseAttr, 'value') &&
          */
          baseAttr.value &&
          baseAttr.value !== getLiteralPropValue(attribute)
        ) {
          return false;
        }
        return true;
      },
    ),
  );
}

export default attributesComparator;
