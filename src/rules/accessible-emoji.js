/**
 * @fileoverview Enforce emojis are wrapped in <span> and provide screen reader access.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import emojiRegex from 'emoji-regex';
import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import safeRegexTest from 'safe-regex-test';
import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage = 'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      description: 'Enforce emojis are wrapped in `<span>` and provide screen reader access.',
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/accessible-emoji.md',
    },
    deprecated: true,
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);

    const testEmoji = safeRegexTest(emojiRegex());
    return {
      JSXOpeningElement: (node) => {
        const literalChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText');

        if (literalChildValue && testEmoji(literalChildValue.value)) {
          const elementIsHidden = isHiddenFromScreenReader(elementType(node), node.attributes);
          if (elementIsHidden) {
            return; // emoji is decorative
          }

          const rolePropValue = getLiteralPropValue(getProp(node.attributes, 'role'));
          const ariaLabelProp = getProp(node.attributes, 'aria-label');
          const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
          const hasLabel = ariaLabelProp !== undefined || arialLabelledByProp !== undefined;
          const isSpan = elementType(node) === 'span';

          if (hasLabel === false || rolePropValue !== 'img' || isSpan === false) {
            context.report({
              node,
              message: errorMessage,
            });
          }
        }
      },
    };
  },
};
