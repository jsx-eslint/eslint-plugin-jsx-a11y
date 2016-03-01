/**
 * @fileoverview Enforce onmouseover/onmouseout are accompanied
 *  by onfocus/onblur.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/mouseEvents-require-keyEvents';
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

const mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
  type: 'JSXOpeningElement'
};
const mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
  type: 'JSXOpeningElement'
};

ruleTester.run('mouseEvents-require-keyEvents', rule, {
  valid: [
    { code: '<div onMouseOver={() => void 0} onFocus={() => void 0} />;', parserOptions },
    { code: '<div onMouseOver={() => void 0} onFocus={() => void 0} {...props} />;', parserOptions },
    { code: '<div />;', parserOptions },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} />', parserOptions },
    { code: '<div onMouseOut={() => void 0} onBlur={() => void 0} {...props} />', parserOptions }
  ],
  invalid: [
    { code: '<div onMouseOver={() => void 0} />;', errors: [ mouseOverError ], parserOptions },
    { code: '<div onMouseOut={() => void 0} />', errors: [ mouseOutError ], parserOptions },
    { code: '<div onMouseOver={() => void 0} {...props} />', errors: [ mouseOverError ], parserOptions },
    { code: '<div onMouseOut={() => void 0} {...props} />', errors: [ mouseOutError ], parserOptions }
  ]
});
