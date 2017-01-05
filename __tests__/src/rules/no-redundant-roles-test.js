/* eslint-env jest */
/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit default role property on element.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-redundant-roles';

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

const expectedError = (element, implicitRole) => ({
  message: `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`,
  type: 'JSXOpeningElement',
});

ruleTester.run('no-redundant-roles', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<button role="main" />', parserOptions },
    { code: '<MyComponent role="button" />', parserOptions },
    { code: '<button role={`${foo}button`} />', parserOptions },
  ],
  invalid: [
    { code: '<button role="button" />', errors: [expectedError('button', 'button')], parserOptions },
    { code: '<body role="DOCUMENT" />', errors: [expectedError('body', 'document')], parserOptions },
    { code: '<button role={`${undefined}button`} />', errors: [expectedError('button', 'button')], parserOptions },
  ],
});
