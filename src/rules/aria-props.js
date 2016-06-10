/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import ariaAttributes from '../util/attributes/ARIA';
import getSuggestion from '../util/getSuggestion';
import { propName } from 'jsx-ast-utils';

const errorMessage = name => {
  const dictionary = Object.keys(ariaAttributes).map(aria => aria.toLowerCase());
  const suggestions = getSuggestion(name, dictionary);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return `${message} Did you mean to use ${suggestions}?`;
  }

  return message;
};

module.exports = context => ({
  JSXAttribute: attribute => {
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
});

module.exports.schema = [
  { type: 'object' },
];
