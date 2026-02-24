/**
 * @fileoverview Enforce <marquee> elements are not used.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/accessible-emoji';
import RuleTester from '../../__util__/RuleTester';
import parsers from '../../__util__/helpers/parsers';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.',
};

ruleTester.run('accessible-emoji', rule, {
  valid: parsers.all([].concat(
    { code: '<div />;' },
    { code: '<span />' },
    { code: '<span>No emoji here!</span>' },
    { code: '<span role="img" aria-label="Panda face">🐼</span>' },
    { code: '<span role="img" aria-label="Snowman">&#9731;</span>' },
    { code: '<span role="img" aria-labelledby="id1">🐼</span>' },
    { code: '<span role="img" aria-labelledby="id1">&#9731;</span>' },
    { code: '<span role="img" aria-labelledby="id1" aria-label="Snowman">&#9731;</span>' },
    { code: '<span>{props.emoji}</span>' },
    { code: '<span aria-hidden>{props.emoji}</span>' },
    { code: '<span aria-hidden="true">🐼</span>' },
    { code: '<span aria-hidden>🐼</span>' },
    { code: '<div aria-hidden="true">🐼</div>' },
    { code: '<input type="hidden">🐼</input>' },
    {
      code: '<CustomInput type="hidden">🐼</CustomInput>',
      settings: { 'jsx-a11y': { components: { CustomInput: 'input' } } },
    },
    {
      code: '<Box as="input" type="hidden">🐼</Box>',
      settings: { 'jsx-a11y': { polymorphicPropName: 'as' } },
    },
  )).map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    { code: '<span>🐼</span>', errors: [expectedError] },
    { code: '<span>foo🐼bar</span>', errors: [expectedError] },
    { code: '<span>foo 🐼 bar</span>', errors: [expectedError] },
    { code: '<i role="img" aria-label="Panda face">🐼</i>', errors: [expectedError] },
    { code: '<i role="img" aria-labelledby="id1">🐼</i>', errors: [expectedError] },
    { code: '<Foo>🐼</Foo>', errors: [expectedError] },
    { code: '<span aria-hidden="false">🐼</span>', errors: [expectedError] },
    { code: '<CustomInput type="hidden">🐼</CustomInput>', errors: [expectedError] },
    {
      code: '<Box as="span">🐼</Box>',
      settings: { 'jsx-a11y': { polymorphicPropName: 'as' } },
      errors: [expectedError],
    },
  )).map(parserOptionsMapper),
});
