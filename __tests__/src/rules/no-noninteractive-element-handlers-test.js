/* eslint-env jest */
/**
 * @fileoverview $DESCRIPTION
 * @author $AUTHOR
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-noninteractive-element-handlers';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-noninteractive-element-handlers', rule, {
  valid: [
    { code: '<div />;' },
  ].map(parserOptionsMapper),
  invalid: [].map(parserOptionsMapper),
});
