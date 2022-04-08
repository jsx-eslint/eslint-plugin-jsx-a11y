/**
 * @fileoverview Enforce distracting elements are not used.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { generateObjSchema, enumArraySchema } from '../util/schemas';
import getElementType from '../util/getElementType';

const errorMessage = (element) => (
  `Do not use <${element}> elements as they can create visual accessibility issues and are deprecated.`
);

const DEFAULT_ELEMENTS = [
  'marquee',
  'blink',
];

const schema = generateObjSchema({
  elements: enumArraySchema(DEFAULT_ELEMENTS),
});

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-distracting-elements.md',
      description: 'Enforce distracting elements are not used.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const options = context.options[0] || {};
        const elementOptions = options.elements || DEFAULT_ELEMENTS;
        const type = elementType(node);
        const distractingElement = elementOptions.find((element) => type === element);

        if (distractingElement) {
          context.report({
            node,
            message: errorMessage(distractingElement),
          });
        }
      },
    };
  },
};
