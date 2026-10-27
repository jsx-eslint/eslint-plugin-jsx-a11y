/**
 * @fileoverview Enforce boolean literals over "true" and "false" strings for ARIA states and properties.
 * @author Thomas Tran
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import RuleTester from '../../__util__/RuleTester';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/prefer-boolean-aria-values';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = (name, value, literal = value) => ({
  message: `Use the boolean {${value}} instead of the string "${literal}" for ${name}.`,
  type: 'JSXAttribute',
});

ruleTester.run('prefer-boolean-aria-values', rule, {
  valid: parsers.all([].concat(
    { code: '<div aria-hidden />' },
    { code: '<div aria-hidden={true} />' },
    { code: '<div aria-hidden={false} />' },
    { code: '<div aria-expanded={open} />' },
    { code: '<div aria-expanded={open ? "true" : "false"} />' },
    { code: '<div aria-checked="mixed" />' },
    { code: '<div aria-pressed="mixed" />' },
    { code: '<div aria-current="page" />' },
    { code: '<div aria-haspopup="menu" />' },
    { code: '<div aria-invalid="grammar" />' },
    // String-typed ARIA properties take any text.
    { code: '<div aria-label="true" />' },
    { code: '<div aria-valuetext="false" />' },
    // Not an ARIA attribute.
    { code: '<div data-hidden="true" />' },
    { code: '<input value="true" />' },
    { code: '<div aria-foo="true" />' },
    { code: '<div {...props} />' },
  )).map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    {
      code: '<div aria-hidden="true" />',
      output: '<div aria-hidden={true} />',
      errors: [expectedError('aria-hidden', 'true')],
    },
    {
      code: '<div aria-hidden="false" />',
      output: '<div aria-hidden={false} />',
      errors: [expectedError('aria-hidden', 'false')],
    },
    {
      code: "<div aria-hidden='true' />",
      output: '<div aria-hidden={true} />',
      errors: [expectedError('aria-hidden', 'true')],
    },
    {
      code: '<div aria-hidden={"true"} />',
      output: '<div aria-hidden={true} />',
      errors: [expectedError('aria-hidden', 'true')],
    },
    {
      code: '<div aria-hidden="TRUE" />',
      output: '<div aria-hidden={true} />',
      errors: [expectedError('aria-hidden', 'true', 'TRUE')],
    },
    {
      code: '<button aria-expanded="false" />',
      output: '<button aria-expanded={false} />',
      errors: [expectedError('aria-expanded', 'false')],
    },
    {
      code: '<div aria-disabled="true" />',
      output: '<div aria-disabled={true} />',
      errors: [expectedError('aria-disabled', 'true')],
    },
    {
      code: '<div role="checkbox" aria-checked="false" />',
      output: '<div role="checkbox" aria-checked={false} />',
      errors: [expectedError('aria-checked', 'false')],
    },
    {
      code: '<button aria-pressed="true" />',
      output: '<button aria-pressed={true} />',
      errors: [expectedError('aria-pressed', 'true')],
    },
    {
      code: '<a aria-current="true" />',
      output: '<a aria-current={true} />',
      errors: [expectedError('aria-current', 'true')],
    },
    {
      code: '<button aria-haspopup="true" />',
      output: '<button aria-haspopup={true} />',
      errors: [expectedError('aria-haspopup', 'true')],
    },
    {
      code: '<input aria-invalid="false" />',
      output: '<input aria-invalid={false} />',
      errors: [expectedError('aria-invalid', 'false')],
    },
    {
      code: '<div aria-modal="true" aria-busy="false" />',
      output: '<div aria-modal={true} aria-busy={false} />',
      errors: [expectedError('aria-modal', 'true'), expectedError('aria-busy', 'false')],
    },
  )).map(parserOptionsMapper),
});
