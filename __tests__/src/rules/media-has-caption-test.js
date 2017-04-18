/* eslint-env jest */
/**
 * @fileoverview <audio> and <video> elements must have a <track> for captions.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/media-has-caption';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Media elements such as <audio> and <video> must have a <track> for captions.',
  type: 'JSXOpeningElement',
};

ruleTester.run('media-has-caption', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<MyDiv />;' },
    { code: '<audio><track kind="captions" /></audio>' },
    { code: '<audio><track kind="Captions" /></audio>' },
    {
      code: '<audio><track kind="Captions" /><track kind="subtitles" /></audio>',
    },
    { code: '<video><track kind="captions" /></video>' },
    { code: '<video><track kind="Captions" /></video>' },
    {
      code: '<video><track kind="Captions" /><track kind="subtitles" /></video>',
    },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<audio><track /></audio>', errors: [expectedError] },
    {
      code: '<audio><track kind="subtitles" /></audio>',
      errors: [expectedError],
    },
    { code: '<audio />', errors: [expectedError] },
    { code: '<video><track /></video>', errors: [expectedError] },
    {
      code: '<video><track kind="subtitles" /></video>',
      errors: [expectedError],
    },
    { code: '<video />', errors: [expectedError] },
    { code: '<audio>Foo</audio>', errors: [expectedError] },
    { code: '<video>Foo</video>', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
