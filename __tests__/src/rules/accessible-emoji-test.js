/**
 * @fileoverview Enforce <marquee> elements are not used.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/accessible-emoji';

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
  message: 'Emojis should be wrapped in <span>, have role="img", and have aria-label="Description of emoji".',
  type: 'JSXOpeningElement',
};

ruleTester.run('accessible-emoji', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<span />', parserOptions },
    { code: '<span>No emoji here!</span>', parserOptions },
    { code: '<span role="img" aria-label="Panda face">🐼</span>', parserOptions },
    { code: '<span role="img" aria-label="Snowman">&#9731;</span>', parserOptions },
    { code: '<span>{props.emoji}</span>', parserOptions },
  ],
  invalid: [
    { code: '<span>🐼</span>', errors: [expectedError], parserOptions },
    { code: '<span>foo🐼bar</span>', errors: [expectedError], parserOptions },
    { code: '<span>foo 🐼 bar</span>', errors: [expectedError], parserOptions },
    { code: '<i role="img" aria-label="Panda face">🐼</i>', errors: [expectedError], parserOptions },
    { code: '<Foo>🐼</Foo>', errors: [expectedError], parserOptions },
  ],
});
