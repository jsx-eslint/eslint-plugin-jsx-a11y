/**
 * @fileoverview Enforce lang attribute has a valid value.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/lang';
import RuleTester from '../../__util__/RuleTester';
import parsers from '../../__util__/helpers/parsers';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'lang attribute must have a valid value.',
  type: 'JSXOpeningElement',
};

const expectedHtmlHasLangError = {
  message: '<html> elements must have the lang prop.',
  type: 'JSXOpeningElement',
};

const componentsSettings = {
  'jsx-a11y': {
    polymorphicPropName: 'as',
    components: {
      Foo: 'html',
    },
  },
};

ruleTester.run('lang', rule, {
  valid: parsers.all([].concat(
    { code: '<div />;' },
    { code: '<div foo="bar" />;' },
    { code: '<div lang="foo" />;' },
    { code: '<html lang="en" />' },
    { code: '<html lang="en-US" />' },
    { code: '<html lang="zh-Hans" />' },
    { code: '<html lang="zh-Hant-HK" />' },
    { code: '<html lang="zh-yue-Hant" />' },
    { code: '<html lang="ja-Latn" />' },
    { code: '<html lang={foo} />' },
    { code: '<HTML lang="foo" />' },
    { code: '<Foo lang={undefined} />' },
    { code: '<html lang={undefined} />' },
    { code: '<html lang={foo} />', options: [{ htmlHasLang: true }] },
    { code: '<Foo lang={undefined} />', settings: componentsSettings },
    { code: '<Foo lang="en" />', settings: componentsSettings },
    { code: '<Box as="html" lang="en"  />', settings: componentsSettings },
    { code: '<html />', options: [{ htmlHasLang: false }] },
    { code: '<Foo />', settings: componentsSettings, options: [{ htmlHasLang: false }] },
  )).map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    { code: '<html lang="foo" />', errors: [expectedError] },
    { code: '<html lang="zz-LL" />', errors: [expectedError] },
    { code: '<Box as="html" lang="foo" />', settings: componentsSettings, errors: [expectedError] },
    { code: '<html />', options: [{ htmlHasLang: true }], errors: [expectedHtmlHasLangError] },
    { code: '<html lang={undefined} />', options: [{ htmlHasLang: true }], errors: [expectedHtmlHasLangError] },
    {
      code: '<Foo lang={undefined} />', settings: componentsSettings, options: [{ htmlHasLang: true }], errors: [expectedHtmlHasLangError],
    },
    {
      code: '<Foo />', settings: componentsSettings, options: [{ htmlHasLang: true }], errors: [expectedHtmlHasLangError],
    },
    { code: '<html lang="foo" />', options: [{ htmlHasLang: true }], errors: [expectedError] },
  )).map(parserOptionsMapper),
});
