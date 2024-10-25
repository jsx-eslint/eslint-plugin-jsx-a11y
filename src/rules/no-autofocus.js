/**
 * @fileoverview Enforce autoFocus prop is not used.
 * @author Ethan Cohen <@evcohen>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName } from 'jsx-ast-utils';
import { dom } from 'aria-query';
import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: 'boolean',
    default: false,
  },
});

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-autofocus.md',
      description: 'Enforce autoFocus prop is not used.',
    },
    messages: {
      error: 'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXAttribute: (attribute) => {
        // Determine if ignoreNonDOM is set to true
        // If true, then do not run rule.
        const options = context.options[0] || {};
        const ignoreNonDOM = !!options.ignoreNonDOM;

        if (ignoreNonDOM) {
          const type = elementType(attribute.parent);
          if (!dom.get(type)) {
            return;
          }
        }

        // Don't normalize, since React only recognizes autoFocus on low-level DOM elements.
        if (propName(attribute) === 'autoFocus') {
          context.report({
            messageId: 'error',
            node: attribute,
          });
        }
      },
    };
  },
};
