/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/onClick-uses-role');
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
  message: 'Visible, non-interactive elements with click handlers must have role attribute.',
  type: 'JSXOpeningElement'
};

ruleTester.run('onClick-uses-role', rule, {
  valid: [
    {code: '<div onClick={() => void 0} role="button" />;', parserOptions: parserOptions},
    {code: '<div className="foo" />;', parserOptions: parserOptions},
    {code: '<div onClick={() => void 0} role="button" aria-hidden />;', parserOptions: parserOptions},
    {code: '<div onClick={() => void 0} role="button" aria-hidden={true} />;', parserOptions: parserOptions},
    {code: '<div onClick={() => void 0} role="button" aria-hidden={false} />;', parserOptions: parserOptions},
    {code: '<input type="text" onClick={() => void 0} />', parserOptions: parserOptions},
    {code: '<input onClick={() => void 0} />', parserOptions: parserOptions},
    {code: '<button onClick={() => void 0} className="foo" />', parserOptions: parserOptions},
    {code: '<option onClick={() => void 0} className="foo" />', parserOptions: parserOptions},
    {code: '<select onClick={() => void 0} className="foo" />', parserOptions: parserOptions},
    {code: '<textarea onClick={() => void 0} className="foo" />', parserOptions: parserOptions},
    {code: '<a tabIndex="0" onClick={() => void 0} />', parserOptions: parserOptions},
    {code: '<a role="button" onClick={() => void 0} />', parserOptions: parserOptions},
    {code: '<a onClick={() => void 0} href="http://x.y.z" />', parserOptions: parserOptions},
    {code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<div onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<section onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<main onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<article onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<header onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<footer onClick={() => void 0} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<div onClick={() => void 0} aria-hidden={false} />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<input onClick={() => void 0} type="hidden" />;', errors: [expectedError], parserOptions: parserOptions},
    {code: '<a onClick={() => void 0} />', errors: [expectedError], parserOptions: parserOptions}
  ]
});
