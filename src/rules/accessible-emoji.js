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

const errorMessage =
  'Emojis should be wrapped in <span>, have role="img", and have aria-label="Description of emoji".';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const literalChildValue = node.parent.children.find((child) => {
        if (child.type === 'Literal') {
          return child.value;
        }
        return false;
      });

      if (literalChildValue && emojiRegex().test(literalChildValue.value)) {
        const rolePropValue = getLiteralPropValue(getProp(node.attributes, 'role'));
        const ariaLabelProp = getProp(node.attributes, 'aria-label');
        const isSpan = elementType(node) === 'span';

        if (ariaLabelProp === 'undefined' || rolePropValue !== 'img' || isSpan === false) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
