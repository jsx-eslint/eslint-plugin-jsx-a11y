/* eslint-env jest */
/**
 * @fileoverview Enforce disabled prop is not used.
 * @author Courtney Nguyen <@courtyenn>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-disabled';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedWarning = {
  message: 'The disabled prop removes the element from being detected by screen readers.',
  type: 'JSXAttribute',
};

ruleTester.run('no-disabled', rule, {
  valid: [
    { code: '<div />' },
    { code: '<div disabled />' },
    { code: '<input />' },
    { code: '<button />' },
    { code: '<select />' },
    { code: '<textarea />' },
    { code: '<option />' },
    { code: '<command />' },
    { code: '<fieldset />' },
    { code: '<keygen />' },
    { code: '<optgroup />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<input disabled />', errors: [expectedWarning] },
    { code: '<button disabled />', errors: [expectedWarning] },
    { code: '<select disabled />', errors: [expectedWarning] },
    { code: '<textarea disabled />', errors: [expectedWarning] },
    { code: '<option disabled />', errors: [expectedWarning] },
    { code: '<command disabled />', errors: [expectedWarning] },
    { code: '<fieldset disabled />', errors: [expectedWarning] },
    { code: '<keygen disabled />', errors: [expectedWarning] },
    { code: '<optgroup disabled />', errors: [expectedWarning] },
  ].map(parserOptionsMapper),
});
