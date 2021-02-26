/* eslint-env jest */
/**
 * @fileoverview Discourage use of div when text is apply
 * @author Felicia Kovacs
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/div-has-apply';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Div should not have text apply. Use button native HTML element instead.',
  type: 'JSXOpeningElement',
};

ruleTester.run('div-has-apply', rule, {
  valid: [
     // DEFAULT ELEMENT TESTS
    // { code: '<div />;' }, //not sure why this was included in heading-has-content-rule
    { code: '<button>apply</button>' },
    { code: '<button><Bar /></button>' },
    { code: '<button>{apply}</button>' },
    { code: '<button>{apply.bar}</button>' },
    { code: '<button dangerouslySetInnerHTML={{ __html: "apply" }} />' },
    { code: '<button children={children} />' },
      // CUSTOM ELEMENT TESTS FOR COMPONENTS OPTION
      { code: '<Button>Apply</Button>', options: components },
      { code: '<Title>Apply</Title>', options: components },
      { code: '<Button><Bar /></Button>', options: components },
      { code: '<Button>{apply}</Button>', options: components },
      { code: '<Button>{apply.bar}</Button>', options: components },
      { code: '<Button dangerouslySetInnerHTML={{ __html: "apply" }} />', options: components },
      { code: '<Button children={children} />', options: components },
      { code: '<button aria-hidden />' },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT TESTS
    { code: '<button />', errors: [expectedError] },
    { code: '<button><Bar aria-hidden /></button>', errors: [expectedError] },
    { code: '<button>{undefined}</button>', errors: [expectedError] },
    { code: '<div>apply</div>', errors: [expectedError] },

    // CUSTOM ELEMENT TESTS FOR COMPONENTS OPTION
    { code: '<Button />', errors: [expectedError], options: components },
    { code: '<Button><Bar aria-hidden /></Button>', errors: [expectedError], options: components },
    { code: '<Button>{undefined}</Button>', errors: [expectedError], options: components },
  ].map(parserOptionsMapper),
});
