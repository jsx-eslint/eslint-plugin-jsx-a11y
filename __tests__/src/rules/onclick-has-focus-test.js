/* eslint-env jest */
/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/onclick-has-focus';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'An non-interactive element with an onClick handler and an ' +
    'interactive role must be focusable. Either set the tabIndex property to ' +
    'a valid value (usually 0) or use an element type which is inherently ' +
    'focusable such as `button`.',
  type: 'JSXOpeningElement',
};

ruleTester.run('onclick-has-focus', rule, {
  valid: [
  ].map(parserOptionsMapper),

  invalid: [
    {
      code: '<span role="button" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<a role="button" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="button" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="checkbox" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="link" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="gridcell" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="menuitem" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="menuitemcheckbox" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="menuitemradio" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="option" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="radio" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="searchbox" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="slider" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="spinbutton" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="switch" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="tab" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="textbox" onClick={() => void 0} />',
      errors: [expectedError],
    },
    {
      code: '<div role="treeitem" onClick={() => void 0} />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
