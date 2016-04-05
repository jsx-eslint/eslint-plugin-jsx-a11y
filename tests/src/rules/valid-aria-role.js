/**
 * @fileoverview Enforce aria role attribute is valid.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/valid-aria-role';
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

const errorMessage = {
  message: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.',
  type: 'JSXAttribute'
};

import validRoleTypes from '../../../src/util/validRoleTypes';

// Create basic test cases using all valid role types.
const basicValidityTests = validRoleTypes.map(role => ({
  code: `<div role="${role.toLowerCase()}" />`,
  parserOptions
}));

ruleTester.run('valid-aria-role', rule, {
  valid: [
    // Variables should pass, as we are only testing literals.
    { code: '<div />', parserOptions },
    { code: '<div></div>', parserOptions },
    { code: '<div role={role} />', parserOptions },
    { code: '<div role={role || "button"} />', parserOptions },
    { code: '<div role={role || "foobar"} />', parserOptions },
    { code: '<div role="tabpanel row" />', parserOptions },
    { code: '<Bar baz />', parserOptions }
  ].concat(basicValidityTests),
  invalid: [
    { code: '<div role="foobar" />', errors: [ errorMessage ], parserOptions },
    { code: '<div role="datepicker"></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role="range"></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role=""></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role="tabpanel row foobar"></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role="tabpanel row range"></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role={undefined}></div>', errors: [ errorMessage ], parserOptions },
    { code: '<div role />', errors: [ errorMessage ], parserOptions },
    { code: '<div role={null}></div>', errors: [ errorMessage ], parserOptions }
  ]
});
