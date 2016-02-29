/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/use-onblur-not-onchange');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

var ruleTester = new RuleTester();

var expectedError = {
  message: 'onBlur must be used instead of onchange, unless absolutely necessary and it ' +
    'causes no negative consequences for keyboard only or screen reader users.',
  type: 'JSXOpeningElement'
};

ruleTester.run('use-onblur-not-onchange', rule, {
  valid: [
    {code: '<div onBlur={() => {}} />;', parserOptions: parserOptions},
    {code: '<div />;', parserOptions: parserOptions},
    {code: '<div onBlur={() => {}} onChange={() => {}} />;', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<div onChange={() => {}} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<input onChange={() => {}} />', errors: [expectedError], parserOptions: parserOptions}
  ]
});
