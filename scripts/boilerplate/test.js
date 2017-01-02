const testBoilerplate = (name, author, description) => `/* eslint-env jest */
/**
 * @fileoverview ${description}
 * @author ${author}
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/${name}';

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
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('${name}', rule, {
  valid: [
    { code: '<div />;', parserOptions },
  ],
  invalid: [],
});
`;

module.exports = testBoilerplate;
