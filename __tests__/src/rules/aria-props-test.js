/* eslint-env jest */
/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/aria-props';
import ariaAttributes from '../../../src/util/attributes/ARIA.json';
import getSuggestion from '../../../src/util/getSuggestion';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errorMessage = (name) => {
  const dictionary = Object.keys(ariaAttributes).map(aria => aria.toLowerCase());
  const suggestions = getSuggestion(name, dictionary);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return {
      type: 'JSXAttribute',
      message: `${message} Did you mean to use ${suggestions}?`,
    };
  }

  return {
    type: 'JSXAttribute',
    message,
  };
};

// Create basic test cases using all valid role types.
const basicValidityTests = Object.keys(ariaAttributes).map(prop => ({
  code: `<div ${prop.toLowerCase()}="foobar" />`,
}));

ruleTester.run('aria-props', rule, {
  valid: [
    // Variables should pass, as we are only testing literals.
    { code: '<div />' },
    { code: '<div></div>' },
    { code: '<div aria="wee"></div>' }, // Needs aria-*
    { code: '<div abcARIAdef="true"></div>' },
    { code: '<div fooaria-foobar="true"></div>' },
    { code: '<div fooaria-hidden="true"></div>' },
    { code: '<Bar baz />' },
  ].concat(basicValidityTests).map(parserOptionsMapper),
  invalid: [
    { code: '<div aria-="foobar" />', errors: [errorMessage('aria-')] },
    {
      code: '<div aria-labeledby="foobar" />',
      errors: [errorMessage('aria-labeledby')],
    },
    {
      code: '<div aria-skldjfaria-klajsd="foobar" />',
      errors: [errorMessage('aria-skldjfaria-klajsd')],
    },
  ].map(parserOptionsMapper),
});
