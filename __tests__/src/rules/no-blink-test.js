/**
 * @fileoverview Enforce no <blink> elements are used.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-blink';

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
  message: 'Do not use <blink> elements as they can create visual accessibility issues and are deprecated.',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-blink', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<Blink />', parserOptions },
    { code: '<div blink />', parserOptions },
  ],
  invalid: [
    { code: '<blink />', errors: [expectedError], parserOptions },
    { code: '<blink {...props} />', errors: [expectedError], parserOptions },
    { code: '<blink foo={undefined} />', errors: [expectedError], parserOptions },
  ],
});
