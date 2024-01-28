/**
 * @fileoverview Disallow duplicate ids.
 * @author Chris Ng
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/no-duplicate-ids';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = (idValue) => ({
  message: `Duplicate ID "${idValue}" found. ID attribute values must be unique.`,
  type: 'JSXOpeningElement',
});

const expectedJSXError = (idValue) => ({
  message: `Duplicate ID "${idValue}" found. ID attribute JSX experssions must be unique.`,
  type: 'JSXOpeningElement',
});

ruleTester.run('no-duplicate-ids', rule, {
  valid: parsers.all([].concat(
    { code: '<div><div id="chris"></div><div id="chris2"></div></div>' },
    { code: '<div><div id={chris}></div><div id={chris2}></div></div>' },
    { code: '<div><MyComponent id="chris" /><MyComponent id="chris2" /></div>' },
    { code: '<div><div id="chris"></div><MyComponent id={chris} /></div>' },
  )).map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    { code: '<div><div id="chris"></div><div id="chris"></div></div>', errors: [expectedError('chris')] },
    { code: '<div><div id={chris}></div><div id={chris}></div></div>', errors: [expectedJSXError('chris')] },
    { code: '<div><MyComponent id="chris" /><MyComponent id="chris" /></div>', errors: [expectedError('chris')] },
    { code: '<div><div id={chris}></div><MyComponent id={chris} /></div>', errors: [expectedJSXError('chris')] },
  )).map(parserOptionsMapper),
});
