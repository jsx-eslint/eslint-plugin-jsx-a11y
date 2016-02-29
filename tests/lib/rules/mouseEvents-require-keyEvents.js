/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var rule = require('../../../lib/rules/mouseEvents-require-keyEvents');
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

var mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
  type: 'JSXOpeningElement'
};
var mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
  type: 'JSXOpeningElement'
};

ruleTester.run('mouseEvents-require-keyEvents', rule, {
  valid: [
    {code: '<div onMouseOver={() => void 0} onFocus={() => void 0} />;', parserOptions: parserOptions},
    {code: '<div />;', parserOptions: parserOptions},
    {code: '<div onMouseOut={() => void 0} onBlur={() => void 0} />', parserOptions: parserOptions}
  ],
  invalid: [
    {code: '<div onMouseOver={() => void 0} />;', errors: [mouseOverError], parserOptions: parserOptions},
    {code: '<div onMouseOut={() => void 0} />', errors: [mouseOutError], parserOptions: parserOptions}
  ]
});
