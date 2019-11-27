/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { aria } from 'aria-query';
import { propName } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import getSuggestion from '../util/getSuggestion';

const ariaAttributes = [...aria.keys()];

const errorMessage = (name) => {
  const suggestions = getSuggestion(name, ariaAttributes);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return `${message} Did you mean to use ${suggestions}?`;
  }

  return message;
};

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-props.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      const name = propName(attribute);

      // `aria` needs to be prefix of property.
      if (name.indexOf('aria-') !== 0) {
        return;
      }

      const isValid = ariaAttributes.indexOf(name) > -1;

      if (isValid === false) {
        context.report({
          node: attribute,
          message: errorMessage(name),
        });
      }
    },
  }),
};
