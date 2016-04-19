/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/aria-props';
import { RuleTester } from 'eslint';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errorMessage = name => ({
  message: `${name}: This attribute is an invalid ARIA attribute.`,
  type: 'JSXAttribute'
});

import ariaAttributes from '../../../src/util/attributes/ARIA';

// Create basic test cases using all valid role types.
const basicValidityTests = Object.keys(ariaAttributes).map(prop => ({
  code: `<div ${prop.toLowerCase()}="foobar" />`,
  parserOptions
}));

ruleTester.run('aria-props', rule, {
  valid: [
    // Variables should pass, as we are only testing literals.
    { code: '<div />', parserOptions },
    { code: '<div></div>', parserOptions },
    { code: '<div aria="wee"></div>', parserOptions }, // Needs aria-*
    { code: '<div abcARIAdef="true"></div>', parserOptions },
    { code: '<div fooaria-foobar="true"></div>', parserOptions },
    { code: '<div fooaria-hidden="true"></div>', parserOptions },
    { code: '<Bar baz />', parserOptions }
  ].concat(basicValidityTests),
  invalid: [
    { code: '<div aria-="foobar" />', errors: [ errorMessage('aria-') ], parserOptions },
    { code: '<div aria-labeledby="foobar" />', errors: [ errorMessage('aria-labeledby') ], parserOptions },
    { code: '<div aria-skldjfaria-klajsd="foobar" />', errors: [ errorMessage('aria-skldjfaria-klajsd') ], parserOptions }
  ]
});
