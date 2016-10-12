/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import ariaAttributes from '../util/attributes/ARIA.json';
import getSuggestion from '../util/getSuggestion';

const errorMessage = (name) => {
  const dictionary = Object.keys(ariaAttributes).map(aria => aria.toLowerCase());
  const suggestions = getSuggestion(name, dictionary);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return `${message} Did you mean to use ${suggestions}?`;
  }

  return message;
};

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXAttribute: (attribute) => {
      const name = propName(attribute);
      const normalizedName = name ? name.toUpperCase() : '';

      // `aria` needs to be prefix of property.
      if (normalizedName.indexOf('ARIA-') !== 0) {
        return;
      }

      const isValid = Object.keys(ariaAttributes).indexOf(normalizedName) > -1;

      if (isValid === false) {
        context.report({
          node: attribute,
          message: errorMessage(name),
        });
      }
    },
  }),
};
