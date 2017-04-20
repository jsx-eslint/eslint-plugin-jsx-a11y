/* eslint-env jest */
/**
 * @fileoverview Enforce all elements that require alternative text have it.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/alt-text';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const missingPropError = type => ({
  message: `${type} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
  type: 'JSXOpeningElement',
});

const altValueError = type => ({
  message: `Invalid alt value for ${type}. \
Use alt="" for presentational images.`,
  type: 'JSXOpeningElement',
});

const preferAltError = () => ({
  message: 'Prefer alt="" over role="presentation". First rule of aria is to not use aria if it can be achieved via native HTML.',
  type: 'JSXOpeningElement',
});

const objectError = 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.';

const array = [{
  img: ['Thumbnail', 'Image'],
  object: ['Object'],
}];


ruleTester.run('alt-text', rule, {
  valid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img alt="foo" />;' },
    { code: '<img alt={"foo"} />;' },
    { code: '<img alt={alt} />;' },
    { code: '<img ALT="foo" />;' },
    { code: '<img ALT={`This is the ${alt} text`} />;' },
    { code: '<img ALt="foo" />;' },
    { code: '<img alt="foo" salt={undefined} />;' },
    { code: '<img {...this.props} alt="foo" />' },
    { code: '<a />' },
    { code: '<img alt={function(e) {} } />' },
    { code: '<div alt={function(e) {} } />' },
    { code: '<img alt={() => void 0} />' },
    { code: '<IMG />' },
    { code: '<UX.Layout>test</UX.Layout>' },
    { code: '<img alt={alt || "Alt text" } />' },
    { code: '<img alt={photo.caption} />;' },
    { code: '<img alt={bar()} />;' },
    { code: '<img alt={foo.bar || ""} />' },
    { code: '<img alt={bar() || ""} />' },
    { code: '<img alt={foo.bar() || ""} />' },
    { code: '<img alt="" />' },
    { code: '<img alt={`${undefined}`} />' },
    { code: '<img alt=" " />' },
    { code: '<img alt="" role="presentation" />' },
    { code: '<img alt="" role={`presentation`} />' },
    { code: '<img alt="" role={"presentation"} />' },
    { code: '<img alt="this is lit..." role="presentation" />' },
    { code: '<img alt={error ? "not working": "working"} />' },
    { code: '<img alt={undefined ? "working": "not working"} />' },
    { code: '<img alt={plugin.name + " Logo"} />' },

    // DEFAULT <object> TESTS
    { code: '<object aria-label="foo" />' },
    { code: '<object aria-labelledby="id1" />' },
    { code: '<object>Foo</object>' },
    { code: '<object><p>This is descriptive!</p></object>' },
    { code: '<Object />' },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    { code: '<Thumbnail alt="foo" />;', options: array },
    { code: '<Thumbnail alt={"foo"} />;', options: array },
    { code: '<Thumbnail alt={alt} />;', options: array },
    { code: '<Thumbnail ALT="foo" />;', options: array },
    { code: '<Thumbnail ALT={`This is the ${alt} text`} />;', options: array },
    { code: '<Thumbnail ALt="foo" />;', options: array },
    { code: '<Thumbnail alt="foo" salt={undefined} />;', options: array },
    { code: '<Thumbnail {...this.props} alt="foo" />', options: array },
    { code: '<thumbnail />', options: array },
    { code: '<Thumbnail alt={function(e) {} } />', options: array },
    { code: '<div alt={function(e) {} } />', options: array },
    { code: '<Thumbnail alt={() => void 0} />', options: array },
    { code: '<THUMBNAIL />', options: array },
    { code: '<Thumbnail alt={alt || "foo" } />', options: array },
    { code: '<Image alt="foo" />;', options: array },
    { code: '<Image alt={"foo"} />;', options: array },
    { code: '<Image alt={alt} />;', options: array },
    { code: '<Image ALT="foo" />;', options: array },
    { code: '<Image ALT={`This is the ${alt} text`} />;', options: array },
    { code: '<Image ALt="foo" />;', options: array },
    { code: '<Image alt="foo" salt={undefined} />;', options: array },
    { code: '<Image {...this.props} alt="foo" />', options: array },
    { code: '<image />', options: array },
    { code: '<Image alt={function(e) {} } />', options: array },
    { code: '<div alt={function(e) {} } />', options: array },
    { code: '<Image alt={() => void 0} />', options: array },
    { code: '<IMAGE />', options: array },
    { code: '<Image alt={alt || "foo" } />', options: array },
    { code: '<Object aria-label="foo" />', options: array },
    { code: '<Object aria-labelledby="id1" />', options: array },
    { code: '<Object>Foo</Object>', options: array },
    { code: '<Object><p>This is descriptive!</p></Object>', options: array },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img />;', errors: [missingPropError('img')] },
    { code: '<img alt />;', errors: [altValueError('img')] },
    { code: '<img alt={undefined} />;', errors: [altValueError('img')] },
    { code: '<img src="xyz" />', errors: [missingPropError('img')] },
    { code: '<img role />', errors: [missingPropError('img')] },
    { code: '<img {...this.props} />', errors: [missingPropError('img')] },
    { code: '<img alt={false || false} />', errors: [altValueError('img')] },
    { code: '<img alt={undefined} role="presentation" />;', errors: [altValueError('img')] },
    { code: '<img alt role="presentation" />;', errors: [altValueError('img')] },
    { code: '<img role="presentation" />;', errors: [preferAltError()] },

    // DEFAULT ELEMENT 'object' TESTS
    { code: '<object />', errors: [objectError] },
    { code: '<object><div aria-hidden /></object>', errors: [objectError] },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    {
      code: '<Thumbnail />;',
      errors: [missingPropError('Thumbnail')],
      options: array,
    },
    {
      code: '<Thumbnail alt />;',
      errors: [altValueError('Thumbnail')],
      options: array,
    },
    {
      code: '<Thumbnail alt={undefined} />;',
      errors: [altValueError('Thumbnail')],
      options: array,
    },
    {
      code: '<Thumbnail src="xyz" />',
      errors: [missingPropError('Thumbnail')],
      options: array,
    },
    {
      code: '<Thumbnail {...this.props} />',
      errors: [missingPropError('Thumbnail')],
      options: array,
    },
    { code: '<Image />;', errors: [missingPropError('Image')], options: array },
    { code: '<Image alt />;', errors: [altValueError('Image')], options: array },
    {
      code: '<Image alt={undefined} />;',
      errors: [altValueError('Image')],
      options: array,
    },
    {
      code: '<Image src="xyz" />',
      errors: [missingPropError('Image')],
      options: array,
    },
    {
      code: '<Image {...this.props} />',
      errors: [missingPropError('Image')],
      options: array,
    },
    { code: '<object />', errors: [objectError], options: array },
    { code: '<object><div aria-hidden /></object>', errors: [objectError], options: array },
  ].map(parserOptionsMapper),
});
