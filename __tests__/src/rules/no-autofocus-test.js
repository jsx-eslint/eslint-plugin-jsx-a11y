/* eslint-env jest */
/**
 * @fileoverview Enforce autoFocus prop is not used.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-autofocus';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.',
  type: 'JSXAttribute',
};

ruleTester.run('no-autofocus', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<div autofocus />;', parserOptions },
    { code: '<input autofocus="true" />;', parserOptions },
  ],
  invalid: [
    { code: '<div autoFocus />', errors: [expectedError], parserOptions },
    { code: '<div autoFocus={true} />', errors: [expectedError], parserOptions },
    { code: '<div autoFocus={false} />', errors: [expectedError], parserOptions },
    { code: '<div autoFocus={undefined} />', errors: [expectedError], parserOptions },
    { code: '<div autoFocus="true" />', errors: [expectedError], parserOptions },
    { code: '<div autoFocus="false" />', errors: [expectedError], parserOptions },
    { code: '<input autoFocus />', errors: [expectedError], parserOptions },
  ],
});
