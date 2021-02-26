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

ruleTester.run('div-has-content', rule, {
  valid: [
    { code: '<button>apply</button>' },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT TESTS
    { code: '<div>apply</div>', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
