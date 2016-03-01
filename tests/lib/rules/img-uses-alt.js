/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../lib/rules/img-uses-alt';
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
  message: 'img elements must have an alt tag.',
  type: 'JSXOpeningElement'
};

ruleTester.run('img-uses-alt', rule, {
  valid: [
    { code: '<img alt="foo" />;', parserOptions },
    { code: '<img ALT="foo" />;', parserOptions },
    { code: '<img ALt="foo" />;', parserOptions },
    { code: '<img {...this.props} alt="foo" />', parserOptions },
    { code: '<a />', parserOptions }
  ],
  invalid: [
    { code: '<img />;', errors: [ expectedError ], parserOptions },
    { code: '<img src="xyz" />', errors: [ expectedError ], parserOptions },
    { code: '<img {...this.props} />', errors: [ expectedError ], parserOptions }
  ]
});
