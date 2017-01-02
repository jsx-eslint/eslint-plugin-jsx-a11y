/* eslint-env jest */
/**
 * @fileoverview Enforce iframe elements have a title attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/iframe-has-title';

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
  message: '<iframe> elements must have a unique title property.',
  type: 'JSXOpeningElement',
};

ruleTester.run('html-has-lang', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<iframe title="Unique title" />', parserOptions },
    { code: '<iframe title={foo} />', parserOptions },
    { code: '<FooComponent />', parserOptions },
  ],
  invalid: [
    { code: '<iframe />', errors: [expectedError], parserOptions },
    { code: '<iframe {...props} />', errors: [expectedError], parserOptions },
    { code: '<iframe title={undefined} />', errors: [expectedError], parserOptions },
    { code: '<iframe title="" />', errors: [expectedError], parserOptions },
    { code: '<iframe title={false} />', errors: [expectedError], parserOptions },
    { code: '<iframe title={true} />', errors: [expectedError], parserOptions },
    { code: "<iframe title={''} />", errors: [expectedError], parserOptions },
    { code: '<iframe title={``} />', errors: [expectedError], parserOptions },
    { code: '<iframe title={""} />', errors: [expectedError], parserOptions },
    { code: '<iframe title={42} />', errors: [expectedError], parserOptions },
  ],
});
