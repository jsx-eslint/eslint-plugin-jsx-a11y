/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author Jesse Beach <@jessebeach>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/aria-activedescendant-has-tabindex';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'An element that manages focus with `aria-activedescendant` ' +
    'must be tabbable',
  type: 'JSXOpeningElement',
};

ruleTester.run('aria-activedescendant-has-tabindex', rule, {
  valid: [
    {
      code: '<CustomComponent />;',
      parserOptions,
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} />;',
      parserOptions,
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} tabIndex={0} />;',
      parserOptions,
    },
    {
      code: '<CustomComponent aria-activedescendant={someID} tabIndex={-1} />;',
      parserOptions,
    },
    {
      code: '<div />;',
      parserOptions,
    },
    {
      code: '<input />;',
      parserOptions,
    },
    {
      code: '<div tabIndex={0} />;',
      parserOptions,
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={0} />;',
      parserOptions,
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex="0" />;',
      parserOptions,
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={1} />;',
      parserOptions,
    },
    {
      code: '<input aria-activedescendant={someID} />;',
      parserOptions,
    },
    {
      code: '<input aria-activedescendant={someID} tabIndex={0} />;',
      parserOptions,
    },
  ],
  invalid: [
    {
      code: '<div aria-activedescendant={someID} />;',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex={-1} />;',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div aria-activedescendant={someID} tabIndex="-1" />;',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<input aria-activedescendant={someID} tabIndex={-1} />;',
      errors: [expectedError],
      parserOptions,
    },
  ],
});
