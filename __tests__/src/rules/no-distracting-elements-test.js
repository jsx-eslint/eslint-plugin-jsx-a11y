/* eslint-env jest */
/**
 * @fileoverview Enforce distracting elements are not used.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-distracting-elements';

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

const expectedError = element => ({
  message: `Do not use <${element}> elements as they can create visual accessibility issues and are deprecated.`,
  type: 'JSXOpeningElement',
});

ruleTester.run('no-marquee', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<Marquee />', parserOptions },
    { code: '<div marquee />', parserOptions },
    { code: '<Blink />', parserOptions },
    { code: '<div blink />', parserOptions },
  ],
  invalid: [
    { code: '<marquee />', errors: [expectedError('marquee')], parserOptions },
    { code: '<marquee {...props} />', errors: [expectedError('marquee')], parserOptions },
    { code: '<marquee lang={undefined} />', errors: [expectedError('marquee')], parserOptions },
    { code: '<blink />', errors: [expectedError('blink')], parserOptions },
    { code: '<blink {...props} />', errors: [expectedError('blink')], parserOptions },
    { code: '<blink foo={undefined} />', errors: [expectedError('blink')], parserOptions },
  ],
});
