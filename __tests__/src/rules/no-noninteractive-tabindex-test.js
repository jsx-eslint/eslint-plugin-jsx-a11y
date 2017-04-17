/* eslint-env jest */
/**
 * @fileoverview Disallow tabindex on static and noninteractive elements
 * @author jessebeach
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-noninteractive-tabindex';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '`tabIndex` should only be declared on interactive elements.',
  type: 'JSXAttribute',
};

const alwaysValid = [
  { code: '<MyButton tabIndex={0} />' },
  { code: '<button />' },
  { code: '<button tabIndex="0" />' },
  { code: '<button tabIndex={0} />' },
  { code: '<div />' },
  { code: '<div tabIndex="-1" />' },
  { code: '<div role="button" tabIndex="0" />' },
  { code: '<div role="article" tabIndex="-1" />' },
  { code: '<article tabIndex="-1" />' },
];

const neverValid = [
  { code: '<div tabIndex="0" />', errors: [expectedError] },
  { code: '<div role="article" tabIndex="0" />', errors: [expectedError] },
  { code: '<article tabIndex="0" />', errors: [expectedError] },
  { code: '<article tabIndex={0} />', errors: [expectedError] },
];

ruleTester.run('no-noninteractive-tabindex', rule, {
  valid: [
    ...alwaysValid,
  ].map(parserOptionsMapper),
  invalid: [
    ...neverValid,
  ].map(parserOptionsMapper),
});
