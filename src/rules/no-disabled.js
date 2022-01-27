/**
 * @fileoverview Rule to flag 'disabled' prop
 * @author Courtney Nguyen <@courtyenn>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, elementType } from 'jsx-ast-utils';

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

export default {
  meta: {
    type: 'suggestion',
    docs: {
      recommended: false,
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-disabled.md',
    },
    schema: [],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      // Only monitor eligible elements for "disabled".
      const type = elementType(attribute.parent);
      if (!DEFAULT_ELEMENTS.includes(type)) {
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
