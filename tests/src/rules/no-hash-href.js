/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/no-hash-href';
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

const expectedError = {
  message: 'Links must not point to "#". Use a more descriptive href or use a button instead.',
  type: 'JSXOpeningElement'
};

ruleTester.run('no-hash-href', rule, {
  valid: [
    { code: '<a />;', parserOptions },
    { code: '<a {...props} />', parserOptions },
    { code: '<a href="foo" />', parserOptions },
    { code: '<a href={foo} />', parserOptions },
    { code: '<a href="/foo" />', parserOptions },
    { code: '<a href={`${undefined}`} />', parserOptions },
    { code: '<div href="foo" />', parserOptions },
    { code: '<a href={`${undefined}foo`}/>', parserOptions },
    { code: '<a href={`#${undefined}foo`}/>', parserOptions },
    { code: '<a href={`#foo`}/>', parserOptions },
    { code: '<a href={"foo"}/>', parserOptions },
    { code: '<a href="#foo" />', parserOptions }
  ],
  invalid: [
    { code: '<a href="#" />', errors: [ expectedError ], parserOptions },
    { code: '<a href={"#"} />', errors: [ expectedError ], parserOptions },
    { code: '<a href={`#${undefined}`} />', errors: [ expectedError ], parserOptions }
  ]
});
