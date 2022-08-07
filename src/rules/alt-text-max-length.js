import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'Image alt text should be no longer than {{maximumLength}} characters but is {{length}}.';
const schema = generateObjSchema({
  maximumLength: {
    type: 'number',
    default: 125,
  },
});

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/alt-text-max-length.md',
    },
    schema: [schema],
  },

  create: (context) => {
    const { maximumLength = 125 } = context.options[0] || {};
    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        if (type !== 'img') {
          return;
        }

        const alt = getPropValue(getProp(node.attributes, 'alt'));
        if (!alt || alt.length <= maximumLength) {
          return;
        }

        context.report({
          data: { length: alt.length, maximumLength },
          node,
          message: errorMessage,
        });
      },
    };
  },
};
