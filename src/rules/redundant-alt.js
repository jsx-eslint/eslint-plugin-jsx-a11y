/**
 * @fileoverview Enforce img alt attribute does not have the word image, picture, or photo.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const REDUNDANT_WORDS = [
  'image',
  'photo',
  'picture'
];

const errorMessage = 'Redundant alt attribute. Screen-readers already announce `img` tags as an image. ' +
  'You don\'t need to use the words `image`, `photo,` or `picture` in the alt prop.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const type = node.name.name;
    if (type !== 'img') {
      return;
    }

    const altProp = hasAttribute(node.attributes, 'alt');
    const isVisible = isHiddenFromScreenReader(node.attributes) === false;

    if (Boolean(altProp) && typeof altProp === 'string' && isVisible) {
      const hasRedundancy = REDUNDANT_WORDS
        .some(word => Boolean(altProp.match(new RegExp(`(?!{)${word}(?!})`, 'gi'))));

      if (hasRedundancy === true) {
        context.report({
          node,
          message: errorMessage
        });
      }

      return;
    }
  }
});

module.exports.schema = [
  { type: 'object' }
];
