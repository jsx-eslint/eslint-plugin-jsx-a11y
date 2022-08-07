import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/alt-text-max-length';

const ruleTester = new RuleTester();

const expectedError = (length, maximumLength) => ({
  message: `Image alt text should be no longer than ${maximumLength} characters but is ${length}.`,
  type: 'JSXOpeningElement',
});

ruleTester.run('html-has-lang', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<img />' },
    { code: '<img alt="" />' },
    { code: '<abc def />' },
    { code: '<abc def="ghi" />' },
    { code: '<img alt="1234567890" />' },
    { code: '<img alt={other} />' },
    { code: '<img alt="123" />', options: [{ maximumLength: 5 }] },
    { code: '<other alt="123" />', options: [{ maximumLength: 5 }] },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<img alt="${Array.from({ length: 126 }, () => 'x').join('')}" />`,
      errors: [expectedError(126, 125)],
    },
    {
      code: '<img alt="123" />',
      errors: [expectedError(3, 2)],
      options: [{ maximumLength: 2 }],
    },
  ].map(parserOptionsMapper),
});
