/**
 * @fileoverview Enforce emojis are wrapped in <span> and provide screenreader access.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import emojiRegex from 'emoji-regex';
import { getProp, getLiteralPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage = 'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/accessible-emoji.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const literalChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText');

      if (literalChildValue && emojiRegex().test(literalChildValue.value)) {
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
  }),
};
