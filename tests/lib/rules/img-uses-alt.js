/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/img-uses-alt');
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
  message: 'IMG element must have alt tag.',
  type: 'JSXOpeningElement'
};

ruleTester.run('img-uses-alt', rule, {
  valid: [
    {code: '<img alt="foo" />;', parserOptions: parserOptions},
    {code: '<img ALT="foo" />;', parserOptions: parserOptions},
    {code: '<img ALt="foo" />;', parserOptions: parserOptions},
    {code: '<img {...this.props} alt="foo" />', parserOptions: parserOptions},
    {code: '<img {...this.props} />', parserOptions: parserOptions},
    {code: '<a />', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<img />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<img src="xyz" />', errors: [expectedError], parserOptions: parserOptions}
  ]
});
