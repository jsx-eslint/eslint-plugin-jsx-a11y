/* eslint-env jest */
/**
 * @fileoverview Discourage use of div when text is apply
 * @author Felicia Kovacs
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/div-has-apply';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Div should not have text apply. Use button native HTML element instead.',
  type: 'JSXOpeningElement',
};

ruleTester.run('div-has-apply', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div>test</div>' },
    { code: '<div></div>' },
    { code: '<div tabindex="0" role="button">apply</div>' },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT TESTS
    { code: '<div>apply</div>', errors: [expectedError] },
    { code: '<div>ok</div>', errors: [expectedError] },
    { code: '<div>finish</div>', errors: [expectedError] },
    { code: '<div>submit</div>', errors: [expectedError] },
    { code: '<div>delete</div>', errors: [expectedError] },
    { code: '<div tabindex role>apply</div>' },
  ].map(parserOptionsMapper),
});
