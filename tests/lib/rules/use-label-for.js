/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/use-label-for');
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
  message: 'Form controls using a label to identify them must have only one label ' +
    'that is programmatically associated with the control using: label for=[ID of control].',
  type: 'JSXOpeningElement'
};

ruleTester.run('use-label-for', rule, {
  valid: [
    {code: '<label htmlFor="foo" />;', parserOptions: parserOptions},
    {code: '<div />;', parserOptions: parserOptions},
    {code: '<label htmlFor="foo">Test!</label>;', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<label id="foo" />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<label>First Name</label>', errors: [expectedError], parserOptions: parserOptions}
  ]
});
