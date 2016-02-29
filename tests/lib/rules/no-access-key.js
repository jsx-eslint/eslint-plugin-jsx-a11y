/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-access-key');
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
  message: 'Inconsistencies between keyboard shortcuts and keyboard commands used by screenreader ' +
    'and keyboard only users create accessibility complications so to avoid complications, access keys ' +
    'should not be used.',
  type: 'JSXOpeningElement'
};

ruleTester.run('no-access-key', rule, {
  valid: [
    {code: '<div />;', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<div accesskey="h" />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<div accessKey="h" />', errors: [expectedError], parserOptions: parserOptions},
    {code: '<section acCesSKeY="y" />', errors: [expectedError], parserOptions: parserOptions}
  ]
});
