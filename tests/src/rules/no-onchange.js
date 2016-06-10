/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */


// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/no-onchange';
import { RuleTester } from 'eslint';

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
  message: 'onBlur must be used instead of onchange, unless absolutely necessary and it ' +
    'causes no negative consequences for keyboard only or screen reader users.',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-onchange', rule, {
  valid: [
    { code: '<div onBlur={() => {}} />;', parserOptions },
    { code: '<div onBlur={handleOnBlur} />;', parserOptions },
    { code: '<div />;', parserOptions },
    { code: '<div onBlur={() => {}} onChange={() => {}} />;', parserOptions },
    { code: '<div {...props} />', parserOptions },
  ],
  invalid: [
    { code: '<div onChange={() => {}} />;', errors: [expectedError], parserOptions },
    { code: '<div onChange={handleOnChange} />;', errors: [expectedError], parserOptions },
    { code: '<input onChange={() => {}} />', errors: [expectedError], parserOptions },
    { code: '<input onChange={() => {}} {...props} />', errors: [expectedError], parserOptions },
  ],
});
