/**
 * @fileoverview Enforce img alt attribute does not have the word image, picture, or photo.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import includes from 'array-includes';
import safeRegexTest from 'safe-regex-test';
import { generateObjSchema, arraySchema } from '../util/schemas';
import getElementType from '../util/getElementType';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const REDUNDANT_WORDS = [
  'image',
  'photo',
  'picture',
];

const schema = generateObjSchema({
  components: arraySchema,
  words: arraySchema,
});

const isASCII = safeRegexTest(/[\x20-\x7F]+/);

function getWords(value) {
  return value.split(/\s+/).filter((w) => w.length > 0);
}

// Flags alts whose every word is a redundant word, e.g. "image", "photo picture".
// Compound nouns like "disk image" or "profile photo" are intentionally allowed.
function isOnlyRedundantWords(value, redundantWords) {
  const lowerRedundant = redundantWords.map((w) => w.toLowerCase());
  const words = getWords(value);
  return words.length > 0 && words.every((w) => includes(lowerRedundant, w.toLowerCase()));
}

// Flags alts that open with a redundant word followed by "of", e.g. "image of a cat".
// The "of X" phrasing contributes no additional meaning over the screen-reader announcement.
function startsWithRedundantWordOf(value, redundantWords) {
  const lowerRedundant = redundantWords.map((w) => w.toLowerCase());
  const words = getWords(value);
  return (
    words.length >= 2
    && includes(lowerRedundant, words[0].toLowerCase())
    && words[1].toLowerCase() === 'of'
  );
}

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/img-redundant-alt.md',
      description: 'Enforce `<img>` alt prop does not contain the word "image", "picture", or "photo".',
    },
    messages: {
      redundantAlt: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don\'t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop.',
      redundantAltPrefix: 'Redundant alt prefix. Screen-readers already announce `img` tags as an image. Remove the leading "image of", "photo of", or "picture of" prefix — the descriptive part that follows is sufficient.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const options = context.options[0] || {};
        const componentOptions = options.components || [];
        const typesToValidate = ['img'].concat(componentOptions);
        const nodeType = elementType(node);

        // Only check 'img' elements and custom types.
        if (typesToValidate.indexOf(nodeType) === -1) {
          return;
        }

        const altProp = getProp(node.attributes, 'alt');
        // Return if alt prop is not present.
        if (altProp === undefined) {
          return;
        }

        const value = getLiteralPropValue(altProp);
        const isVisible = isHiddenFromScreenReader(nodeType, node.attributes) === false;

        const {
          words = [],
        } = options;
        const redundantWords = REDUNDANT_WORDS.concat(words);

        if (typeof value === 'string' && isVisible) {
          if (isASCII(value)) {
            if (isOnlyRedundantWords(value, redundantWords)) {
              context.report({ node, messageId: 'redundantAlt' });
            } else if (startsWithRedundantWordOf(value, redundantWords)) {
              context.report({ node, messageId: 'redundantAltPrefix' });
            }
          } else {
            // For non-ASCII text, flag only when the entire value is itself a redundant word.
            const lowerValue = value.trim().toLowerCase();
            if (redundantWords.map((w) => w.toLowerCase()).some((rw) => lowerValue === rw)) {
              context.report({ node, messageId: 'redundantAlt' });
            }
          }
        }
      },
    };
  },
};
