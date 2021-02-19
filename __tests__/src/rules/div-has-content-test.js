/* eslint-env jest */
/**
 * @fileoverview check if div has content
 * @author Felicia
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/div-has-content';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Div must have content and the content must be accessible by a screen reader.',
  type: 'JSXOpeningElement',
};

ruleTester.run('div-has-content', rule, {
  valid: [
    { code: '<div>content</div>;' },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT TESTS
    { code: '<div />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
