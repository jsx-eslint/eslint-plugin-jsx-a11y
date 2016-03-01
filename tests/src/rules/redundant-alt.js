/**
 * @fileoverview Enforce img alt attribute does not have the word image, picture, or photo.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/redundant-alt';
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

const expectedError = {
  message: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image. ' +
    'You don\'t need to use the words `image`, `photo,` or `picture` in the alt prop.',
  type: 'JSXOpeningElement'
};

ruleTester.run('img-uses-alt', rule, {
  valid: [
    { code: '<img alt="foo" />;', parserOptions },
    { code: '<img alt="picture of me taking a photo of an image" aria-hidden />', parserOptions },
    { code: '<img aria-hidden alt="photo of image" />', parserOptions },
    { code: '<img ALt="foo" />;', parserOptions },
    { code: '<img {...this.props} alt="foo" />', parserOptions },
    { code: '<a />', parserOptions },
    { code: '<img />', parserOptions },
    { code: '<img aria-hidden={false} alt="Doing cool things." />', parserOptions }
  ],
  invalid: [
    { code: '<img alt="Photo of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="Picture of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="Image of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="PhOtO of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="piCTUre of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="imAGE of friend." />;', errors: [ expectedError ], parserOptions },
    { code: '<img alt="photo of cool person" aria-hidden={false} />', errors: [ expectedError ], parserOptions },
    { code: '<img alt="picture of cool person" aria-hidden={false} />', errors: [ expectedError ], parserOptions },
    { code: '<img alt="image of cool person" aria-hidden={false} />', errors: [ expectedError ], parserOptions },
    { code: '<img alt="photo" {...this.props} />', errors: [ expectedError ], parserOptions },
    { code: '<img alt="image" {...this.props} />', errors: [ expectedError ], parserOptions },
    { code: '<img alt="picture" {...this.props} />', errors: [ expectedError ], parserOptions }
  ]
});
