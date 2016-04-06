/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/img-uses-alt';
import { RuleTester } from 'eslint';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const customMissingPropError = type => ({
  message: `${type} elements must have an alt prop`,
  type: 'JSXOpeningElement'
});

const customAltValueError = type => ({
  message: `${type} alt prop must have a value`,
  type: 'JSXOpeningElement'
});

const expectedMissingPropError = customMissingPropError('img');
const expectedAltValueError = customAltValueError('img');

const string = [ 'Avatar' ];
const array = [ [ 'Thumbnail', 'Image' ] ];


ruleTester.run('img-uses-alt', rule, {
  valid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img alt="foo" />;', parserOptions },
    { code: '<img alt={"foo"} />;', parserOptions },
    { code: '<img alt={alt} />;', parserOptions },
    { code: '<img ALT="foo" />;', parserOptions },
    { code: '<img ALT={`This is the ${alt} text`} />;', parserOptions },
    { code: '<img ALt="foo" />;', parserOptions },
    { code: '<img alt="foo" salt={undefined} />;', parserOptions },
    { code: '<img {...this.props} alt="foo" />', parserOptions },
    { code: '<a />', parserOptions },
    { code: '<img alt={function(e) {} } />', parserOptions },
    { code: '<div alt={function(e) {} } />', parserOptions },
    { code: '<img alt={() => void 0} />', parserOptions },
    { code: '<IMG />', parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', parserOptions },
    { code: '<img alt={alt || "Alt text" } />', parserOptions },
    { code: '<img alt={photo.caption} />;', parserOptions },
    { code: '<img alt={bar()} />;', parserOptions },
    { code: '<img alt={foo.bar || ""} />', parserOptions },
    { code: '<img alt={bar() || ""} />', parserOptions },
    { code: '<img alt={foo.bar() || ""} />', parserOptions },
    { code: '<img alt=" " />', parserOptions }, // For decorative images.

    // CUSTOM ELEMENT TESTS FOR STRING OPTION
    { code: '<Avatar alt="foo" />;', options: string, parserOptions },
    { code: '<Avatar alt={"foo"} />;', options: string, parserOptions },
    { code: '<Avatar alt={alt} />;', options: string, parserOptions },
    { code: '<Avatar ALT="foo" />;', options: string, parserOptions },
    { code: '<Avatar ALT={`This is the ${alt} text`} />;', options: string, parserOptions },
    { code: '<Avatar ALt="foo" />;', options: string, parserOptions },
    { code: '<Avatar alt="foo" salt={undefined} />;', options: string, parserOptions },
    { code: '<Avatar {...this.props} alt="foo" />', options: string, parserOptions },
    { code: '<avatar />', options: string, parserOptions },
    { code: '<Avatar alt={function(e) {} } />', options: string, parserOptions },
    { code: '<div alt={function(e) {} } />', options: string, parserOptions },
    { code: '<Avatar alt={() => void 0} />', options: string, parserOptions },
    { code: '<AVATAR />', options: string, parserOptions },
    { code: '<Avatar alt={alt || "foo" } />', options: string, parserOptions },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    { code: '<Thumbnail alt="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail alt={"foo"} />;', options: array, parserOptions },
    { code: '<Thumbnail alt={alt} />;', options: array, parserOptions },
    { code: '<Thumbnail ALT="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail ALT={`This is the ${alt} text`} />;', options: array, parserOptions },
    { code: '<Thumbnail ALt="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail alt="foo" salt={undefined} />;', options: array, parserOptions },
    { code: '<Thumbnail {...this.props} alt="foo" />', options: array, parserOptions },
    { code: '<thumbnail />', options: array, parserOptions },
    { code: '<Thumbnail alt={function(e) {} } />', options: array, parserOptions },
    { code: '<div alt={function(e) {} } />', options: array, parserOptions },
    { code: '<Thumbnail alt={() => void 0} />', options: array, parserOptions },
    { code: '<THUMBNAIL />', options: array, parserOptions },
    { code: '<Thumbnail alt={alt || "foo" } />', options: array, parserOptions },
    { code: '<Image alt="foo" />;', options: array, parserOptions },
    { code: '<Image alt={"foo"} />;', options: array, parserOptions },
    { code: '<Image alt={alt} />;', options: array, parserOptions },
    { code: '<Image ALT="foo" />;', options: array, parserOptions },
    { code: '<Image ALT={`This is the ${alt} text`} />;', options: array, parserOptions },
    { code: '<Image ALt="foo" />;', options: array, parserOptions },
    { code: '<Image alt="foo" salt={undefined} />;', options: array, parserOptions },
    { code: '<Image {...this.props} alt="foo" />', options: array, parserOptions },
    { code: '<image />', options: array, parserOptions },
    { code: '<Image alt={function(e) {} } />', options: array, parserOptions },
    { code: '<div alt={function(e) {} } />', options: array, parserOptions },
    { code: '<Image alt={() => void 0} />', options: array, parserOptions },
    { code: '<IMAGE />', options: array, parserOptions },
    { code: '<Image alt={alt || "foo" } />', options: array, parserOptions }
  ],
  invalid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img />;', errors: [ expectedMissingPropError ], parserOptions },
    { code: '<img alt />;', errors: [ expectedAltValueError ], parserOptions },
    { code: '<img alt={undefined} />;', errors: [ expectedAltValueError ], parserOptions },
    { code: '<img alt={`${undefined}`} />;', errors: [ expectedAltValueError ], parserOptions },
    { code: '<img alt="" />;', errors: [ expectedAltValueError ], parserOptions },
    { code: '<img src="xyz" />', errors: [ expectedMissingPropError ], parserOptions },
    { code: '<img {...this.props} />', errors: [ expectedMissingPropError ], parserOptions },
    { code: '<img alt={false || false} />', errors: [ expectedAltValueError ], parserOptions },

    // CUSTOM ELEMENT TESTS FOR STRING OPTION
    {
      code: '<Avatar />;',
      errors: [ customMissingPropError('Avatar') ],
      options: string,
      parserOptions
    },
    { code: '<Avatar alt />;', errors: [ customAltValueError('Avatar') ], options: string, parserOptions },
    { code: '<Avatar alt={undefined} />;', errors: [ customAltValueError('Avatar') ], options: string, parserOptions },
    {
      code: '<Avatar alt={`${undefined}`} />;',
      errors: [ customAltValueError('Avatar') ],
      options: string,
      parserOptions
    },
    { code: '<Avatar alt="" />;', errors: [ customAltValueError('Avatar') ], options: string, parserOptions },
    { code: '<Avatar src="xyz" />', errors: [ customMissingPropError('Avatar') ], options: string, parserOptions },
    { code: '<Avatar {...this.props} />', errors: [ customMissingPropError('Avatar') ], options: string, parserOptions },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    { code: '<Thumbnail />;', errors: [ customMissingPropError('Thumbnail') ], options: array, parserOptions },
    { code: '<Thumbnail alt />;', errors: [ customAltValueError('Thumbnail') ], options: array, parserOptions },
    {
      code: '<Thumbnail alt={undefined} />;',
      errors: [ customAltValueError('Thumbnail') ],
      options: array,
      parserOptions
    },
    {
      code: '<Thumbnail alt={`${undefined}`} />;',
      errors: [ customAltValueError('Thumbnail') ],
      options: array,
      parserOptions
    },
    { code: '<Thumbnail alt="" />;', errors: [ customAltValueError('Thumbnail') ], options: array, parserOptions },
    { code: '<Thumbnail src="xyz" />', errors: [ customMissingPropError('Thumbnail') ], options: array, parserOptions },
    {
      code: '<Thumbnail {...this.props} />',
      errors: [ customMissingPropError('Thumbnail') ],
      options: array,
      parserOptions
    },
    { code: '<Image />;', errors: [ customMissingPropError('Image') ], options: array, parserOptions },
    { code: '<Image alt />;', errors: [ customAltValueError('Image') ], options: array, parserOptions },
    { code: '<Image alt={undefined} />;', errors: [ customAltValueError('Image') ], options: array, parserOptions },
    { code: '<Image alt={`${undefined}`} />;', errors: [ customAltValueError('Image') ], options: array, parserOptions },
    { code: '<Image alt="" />;', errors: [ customAltValueError('Image') ], options: array, parserOptions },
    { code: '<Image src="xyz" />', errors: [ customMissingPropError('Image') ], options: array, parserOptions },
    { code: '<Image {...this.props} />', errors: [ customMissingPropError('Image') ], options: array, parserOptions }
  ]
});
