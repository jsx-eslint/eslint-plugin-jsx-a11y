const testBoilerplate = (name, author, description) => `/**
 * @fileoverview ${description}
 * @author ${author}
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/${name}';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('${name}', rule, {
  valid: parsers.all([].concat(
    { code: '<div />;' },
  ].map(parserOptionsMapper))),
  invalid: parsers.all([].concat(

  ).map(parserOptionsMapper)),
});
`;

module.exports = testBoilerplate;
