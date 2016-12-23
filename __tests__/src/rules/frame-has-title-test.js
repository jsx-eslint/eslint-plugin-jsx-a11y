/**
 * @fileoverview Enforce frame elements have a title attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/frame-has-title';

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
  message: 'Frame elements (frame, iframe) must have a unique title property.',
  type: 'JSXOpeningElement',
};

ruleTester.run('html-has-lang', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<frame title="Unique title" />', parserOptions },
    { code: '<iframe title="Unique title" />', parserOptions },
    { code: '<iframe title={foo} />', parserOptions },
    { code: '<frame title={foo} />', parserOptions },
    { code: '<FooComponent />', parserOptions },
  ],
  invalid: [
    { code: '<frame />', errors: [expectedError], parserOptions },
    { code: '<iframe />', errors: [expectedError], parserOptions },
    { code: '<frame {...props} />', errors: [expectedError], parserOptions },
    { code: '<iframe {...props} />', errors: [expectedError], parserOptions },
    { code: '<frame title={undefined} />', errors: [expectedError], parserOptions },
    { code: '<iframe title={undefined} />', errors: [expectedError], parserOptions },
  ],
});
