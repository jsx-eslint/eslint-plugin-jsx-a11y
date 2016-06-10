/**
 * @fileoverview Enforce img alt attribute does not have the word image, picture, or photo.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const REDUNDANT_WORDS = [
  'image',
  'photo',
  'picture',
];

const errorMessage = 'Redundant alt attribute. Screen-readers already announce ' +
  '`img` tags as an image. You don\'t need to use the words `image`, ' +
  '`photo,` or `picture` in the alt prop.';

const validTypes = [
  'LITERAL',
  'TEMPLATELITERAL',
];

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = elementType(node);
    if (type !== 'img') {
      return;
    }

    const altProp = getProp(node.attributes, 'alt');
    // Return if alt prop is not present.
    if (altProp === undefined) {
      return;
    }

    // Only check literals, as we should not enforce variable names :P
    const normalizedType = altProp.value &&
      altProp.value.type.toUpperCase() === 'JSXEXPRESSIONCONTAINER' ?
      altProp.value.expression.type.toUpperCase() :
      altProp.value.type.toUpperCase();

    if (validTypes.indexOf(normalizedType) === -1) {
      return;
    }

    const value = getPropValue(altProp);
    const isVisible = isHiddenFromScreenReader(type, node.attributes) === false;

    if (Boolean(value) && typeof value === 'string' && isVisible) {
      const hasRedundancy = REDUNDANT_WORDS
        .some(word => Boolean(value.match(new RegExp(`(?!{)${word}(?!})`, 'gi'))));

      if (hasRedundancy === true) {
        context.report({
          node,
          message: errorMessage,
        });
      }

      return;
    }
  },
});

module.exports.schema = [
  { type: 'object' },
];
