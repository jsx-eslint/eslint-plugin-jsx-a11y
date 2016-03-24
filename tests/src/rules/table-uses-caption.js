/**
 * @fileoverview Enforce table element has child of caption with value.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/table-uses-caption';
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
  message: `table elements must have a caption element as child to ` +
  `programatically associate captions for data tables.`,
  type: 'JSXOpeningElement'
};

// const string = [ 'Avatar' ];
// const array = [ [ 'Thumbnail', 'Image' ] ];

// const customError = type => ({
//   message: `${type} elements must have an alt tag.`,
//   type: 'JSXOpeningElement'
// });

ruleTester.run('table-uses-caption', rule, {
  valid: [
    // DEFAULT ELEMENT 'table' TESTS
    { code: '<table><caption>Cool data</caption></table>;', parserOptions },
    { code: '<table><caption>`data of ${type}`</caption></table>;', parserOptions },
    { code: '<table><caption><span>FOO</span></caption></table>;', parserOptions },
    { code: '<table><th></th><tbody></tbody><caption><span>FOO</span></caption></table>;', parserOptions }
  ],
  invalid: [
    { code: '<table><caption></caption></table>;', errors: [ expectedError ], parserOptions },
    { code: '<table></table>;', errors: [ expectedError ], parserOptions },
    { code: '<table><Caption>abc</Caption></table>;', errors: [ expectedError ], parserOptions },
    { code: '<table><th>1</th><tbody></tbody></table>;', errors: [ expectedError ], parserOptions }
  ]
});
