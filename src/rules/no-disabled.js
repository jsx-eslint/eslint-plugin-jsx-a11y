/**
 * @fileoverview Rule to flag 'disabled' prop
 * @author Courtney Nguyen <@courtyenn>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, elementType } from 'jsx-ast-utils';
import {
  enumArraySchema,
  generateObjSchema,
} from '../util/schemas';

const warningMessage = 'The disabled prop removes the element from being detected by screen readers.';

const DEFAULT_ELEMENTS = [
  'button',
  'command',
  'fieldset',
  'keygen',
  'optgroup',
  'option',
  'select',
  'textarea',
  'input',
];

const schema = generateObjSchema({
  disabable: enumArraySchema(DEFAULT_ELEMENTS)
    .filter((name) => DEFAULT_ELEMENTS.includes(name)),
});

export default {
  meta: {
    type: 'suggestion',
    docs: {
      recommended: false,
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-disabled.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      const disabable = (
        context.options && context.options[0] && context.options[0].disabable
      ) || DEFAULT_ELEMENTS;
      // Only monitor eligible elements for "disabled".
      const type = elementType(attribute.parent);
      if (!disabable.includes(type)) {
        return;
      }

      if (propName(attribute) === 'disabled') {
        context.report({
          node: attribute,
          message: warningMessage,
        });
      }
    },
  }),
};
