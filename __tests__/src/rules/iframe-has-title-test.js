/**
 * @fileoverview Enforce iframe elements have a title attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import RuleTester from '../../__util__/RuleTester';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/iframe-has-title';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '<iframe> elements must have a unique title property.',
  type: 'JSXOpeningElement',
};

const componentsSettings = {
  'jsx-a11y': {
    components: {
      FooComponent: 'iframe',
    },
  },
};

ruleTester.run('iframe-has-title', rule, {
  valid: parsers.all([].concat(
    { code: '<div />;' },
    { code: '<iframe title="Unique title" />' },
    { code: '<iframe title={foo} />' },
    { code: '<iframe aria-label="Unique title" />' },
    { code: '<iframe aria-label={foo} />' },
    { code: '<iframe aria-labelledby="titleId" />' },
    { code: '<iframe aria-labelledby={foo} />' },
    { code: '<iframe title="" aria-label="Unique title" />' },
    { code: '<FooComponent />' },
    { code: '<FooComponent title="Unique title" />', settings: componentsSettings },
    { code: '<FooComponent aria-label="Unique title" />', settings: componentsSettings },
  )).map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    { code: '<iframe />', errors: [expectedError] },
    { code: '<iframe {...props} />', errors: [expectedError] },
    { code: '<iframe title={undefined} />', errors: [expectedError] },
    { code: '<iframe title="" />', errors: [expectedError] },
    { code: '<iframe title={false} />', errors: [expectedError] },
    { code: '<iframe title={true} />', errors: [expectedError] },
    { code: "<iframe title={''} />", errors: [expectedError] },
    { code: '<iframe title={``} />', errors: [expectedError] },
    { code: '<iframe title={""} />', errors: [expectedError] },
    { code: '<iframe title={42} />', errors: [expectedError] },
    { code: '<iframe aria-label="" />', errors: [expectedError] },
    { code: '<iframe aria-label={undefined} />', errors: [expectedError] },
    { code: '<iframe aria-label={false} />', errors: [expectedError] },
    { code: '<iframe aria-label={true} />', errors: [expectedError] },
    { code: "<iframe aria-label={''} />", errors: [expectedError] },
    { code: '<iframe aria-label={``} />', errors: [expectedError] },
    { code: '<iframe aria-label={""} />', errors: [expectedError] },
    { code: '<iframe aria-label={42} />', errors: [expectedError] },
    { code: '<iframe aria-labelledby="" />', errors: [expectedError] },
    { code: '<iframe aria-labelledby={undefined} />', errors: [expectedError] },
    { code: '<FooComponent />', errors: [expectedError], settings: componentsSettings },
  )).map(parserOptionsMapper),
});
