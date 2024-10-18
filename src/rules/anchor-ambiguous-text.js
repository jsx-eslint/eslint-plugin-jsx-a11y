/**
 * @fileoverview Enforce anchor text to not exactly match 'click here', 'here', 'link', 'learn more', and user-specified words.
 * @author Matt Wang
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { ESLintConfig, ESLintContext } from '../../flow/eslint';
import { arraySchema, generateObjSchema } from '../util/schemas';
import getAccessibleChildText from '../util/getAccessibleChildText';
import getElementType from '../util/getElementType';

const DEFAULT_AMBIGUOUS_WORDS = [
  'click here',
  'here',
  'link',
  'a link',
  'learn more',
];

const schema = generateObjSchema({
  words: arraySchema,
});

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-ambiguous-text.md',
      description: 'Enforce `<a>` text to not exactly match "click here", "here", "link", or "a link".',
    },
    schema: [schema],
  },

  create: (context: ESLintContext) => {
    const elementType = getElementType(context);

    const typesToValidate = ['a'];

    const options = context.options[0] || {};
    const { words = DEFAULT_AMBIGUOUS_WORDS } = options;
    const ambiguousWords = new Set(words);

    return {
      JSXOpeningElement: (node) => {
        const nodeType = elementType(node);

        // Only check anchor elements and custom types.
        if (typesToValidate.indexOf(nodeType) === -1) {
          return;
        }

        const nodeText = getAccessibleChildText(node.parent, elementType);

        if (!ambiguousWords.has(nodeText)) { // check the value
          return;
        }

        context.report({
          node,
          message: 'Ambiguous text within anchor. Screen reader users rely on link text for context; the words "{{wordsList}}" are ambiguous and do not provide enough context.',
          data: {
            wordsList: words.join('", "'),
          },
        });
      },
    };
  },
}: ESLintConfig);
