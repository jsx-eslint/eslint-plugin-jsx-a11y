/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/img-uses-alt';
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
    { code: '<img alt={"foo"} />;', parserOptions },
    { code: '<img alt={alt} />;', parserOptions },
    { code: '<img ALT="foo" />;', parserOptions },
    { code: '<img ALT={`This is the ${alt} text`} />;', parserOptions },
    { code: '<img ALt="foo" />;', parserOptions },
    { code: '<img alt="foo" salt={undefined} />;', parserOptions },
    { code: '<img {...this.props} alt="foo" />', parserOptions },
    { code: '<a />', parserOptions },
    { code: '<img alt={function(e) {} } />', parserOptions },
    { code: '<div alt={function(e) {} } />', parserOptions },
    { code: '<img alt={() => void 0} />', parserOptions },
    { code: '<IMG />', parserOptions }
  ],
  invalid: [
    { code: '<img />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt={undefined} />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt={`${undefined}`} />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="" />;', errors: [ expectedError ], parserOptions },
    { code: '<img src="xyz" />', errors: [ expectedError ], parserOptions },
    { code: '<img {...this.props} />', errors: [ expectedError ], parserOptions }
  ]
});
