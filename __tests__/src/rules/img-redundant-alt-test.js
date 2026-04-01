/**
 * @fileoverview Enforce img alt attribute does not have the word image, picture, or photo.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import semver from 'semver';
import { version as eslintVersion } from 'eslint/package.json';
import RuleTester from '../../__util__/RuleTester';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/img-redundant-alt';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const array = [{
  components: ['Image'],
  words: ['Word1', 'Word2'],
}];

const componentsSettings = {
  'jsx-a11y': {
    components: {
      Image: 'img',
    },
  },
};

const ruleTester = new RuleTester();

// Fired when the entire alt is nothing but redundant words — no useful content at all.
const redundantAltError = {
  messageId: 'redundantAlt',
  type: 'JSXOpeningElement',
};

// Fired when the alt opens with a redundant word followed by "of" — the prefix adds
// nothing over the screen-reader's own announcement; the description after "of" is enough.
const redundantAltPrefixError = {
  messageId: 'redundantAltPrefix',
  type: 'JSXOpeningElement',
};

ruleTester.run('img-redundant-alt', rule, {
  valid: parsers.all([].concat(
    // -------------------------------------------------------------------
    // Baseline — unrelated or variable alts
    // -------------------------------------------------------------------
    { code: '<img alt="foo" />;' },
    { code: '<img ALt="foo" />;' },
    { code: '<img {...this.props} alt="foo" />' },
    { code: '<img {...this.props} alt={"foo"} />' },
    { code: '<img {...this.props} alt={alt} />' },
    { code: '<a />' },
    { code: '<img />' },
    { code: '<IMG />' },
    { code: '<img alt={undefined} />' },
    { code: '<img alt={`this should pass for ${now}`} />' },
    { code: '<img alt={`this should pass for ${photo}`} />' },
    { code: '<img alt={`this should pass for ${image}`} />' },
    { code: '<img alt={`this should pass for ${picture}`} />' },
    { code: '<img alt={`${photo}`} />' },
    { code: '<img alt={`${image}`} />' },
    { code: '<img alt={`${picture}`} />' },
    { code: '<img alt={"undefined"} />' },
    { code: '<img alt={() => {}} />' },
    { code: '<img alt={function(e){}} />' },
    { code: '<img aria-hidden={false} alt="Doing cool things." />' },
    { code: '<UX.Layout>test</UX.Layout>' },
    { code: '<img alt />' },
    { code: '<img alt={imageAlt} />' },
    { code: '<img alt={imageAlt.name} />' },
    semver.satisfies(eslintVersion, '>= 6') ? [
      { code: '<img alt={imageAlt?.name} />', languageOptions: { ecmaVersion: 2020 } },
      { code: '<img alt="Doing cool things" aria-hidden={foo?.bar}/>', languageOptions: { ecmaVersion: 2020 } },
    ] : [],

    // -------------------------------------------------------------------
    // Words that contain a redundant substring but are not the word itself
    // -------------------------------------------------------------------
    { code: '<img alt="Photography" />;' },
    { code: '<img alt="ImageMagick" />;' },

    // -------------------------------------------------------------------
    // aria-hidden — rule never fires regardless of alt content
    // -------------------------------------------------------------------
    { code: '<img alt="picture of me taking a photo of an image" aria-hidden />' },
    { code: '<img aria-hidden alt="photo of image" />' },

    // -------------------------------------------------------------------
    // Compound nouns and descriptive labels: redundant word is part of a
    // meaningful phrase, NOT a bare announcement of image type.
    // "disk image", "profile photo", "cover picture" all convey real info.
    // -------------------------------------------------------------------
    { code: '<img alt="disk image" />' },
    { code: '<img alt="profile photo" />' },
    { code: '<img alt="cover picture" />' },
    { code: '<img alt="passport photo ID" />' },
    { code: '<img alt="before and after photo collage" />' },
    { code: '<img alt="satellite image overlay" />' },
    { code: '<img alt="Picture Perfect album cover" />' },
    { code: '<img alt="Photo finish at 100m race" />' },
    { code: '<img alt="Photo booth selfie" />' },
    { code: '<img alt="body image awareness poster" />' },

    // -------------------------------------------------------------------
    // Template literals with non-redundant context words
    // -------------------------------------------------------------------
    { code: '<img alt={`picture doing ${things}`} {...this.props} />' },
    { code: '<img alt={`Book cover photo ${index} of ${total}`} {...this.props} />' },
    { code: '<img alt={`${dockerImageName} image running`} {...this.props} />' },

    // -------------------------------------------------------------------
    // Custom component not mapped to img — Image is not validated by default
    // -------------------------------------------------------------------
    { code: '<Image alt="Photo of a friend" />' },
    { code: '<Image alt="Foo" />', settings: componentsSettings },

    // -------------------------------------------------------------------
    // Non-ASCII: only exact-word matches are flagged
    // -------------------------------------------------------------------
    { code: '<img alt="画像" />', options: [{ words: ['イメージ'] }] },
    { code: '<img alt="イメージです" />', options: [{ words: ['イメージ'] }] },
  )).map(parserOptionsMapper),

  invalid: parsers.all([].concat(
    // -------------------------------------------------------------------
    // Pure redundant alts — the entire alt is one or more redundant words,
    // conveying nothing a screen-reader doesn't already announce.
    // -------------------------------------------------------------------
    { code: '<img alt={"photo"} />;', errors: [redundantAltError] },
    { code: '<img alt="photo" {...this.props} />', errors: [redundantAltError] },
    { code: '<img alt="image" {...this.props} />', errors: [redundantAltError] },
    { code: '<img alt="picture" {...this.props} />', errors: [redundantAltError] },

    // -------------------------------------------------------------------
    // "word of ..." prefix — redundant word + "of" adds no meaning over
    // the screen-reader announcement; only the description after "of" matters.
    // -------------------------------------------------------------------
    { code: '<img alt="Photo of friend." />;', errors: [redundantAltPrefixError] },
    { code: '<img alt="Picture of friend." />;', errors: [redundantAltPrefixError] },
    { code: '<img alt="Image of friend." />;', errors: [redundantAltPrefixError] },
    { code: '<img alt="PhOtO of friend." />;', errors: [redundantAltPrefixError] },
    { code: '<img alt="piCTUre of friend." />;', errors: [redundantAltPrefixError] },
    { code: '<img alt="imAGE of friend." />;', errors: [redundantAltPrefixError] },
    {
      code: '<img alt="photo of cool person" aria-hidden={false} />',
      errors: [redundantAltPrefixError],
    },
    {
      code: '<img alt="picture of cool person" aria-hidden={false} />',
      errors: [redundantAltPrefixError],
    },
    {
      code: '<img alt="image of cool person" aria-hidden={false} />',
      errors: [redundantAltPrefixError],
    },
    // Demonstrates the value of the prefix check: "image of a diagram" should
    // just be "diagram" — the "image of" is pure noise for a screen-reader user.
    { code: '<img alt="image of a diagram" />', errors: [redundantAltPrefixError] },
    { code: '<img alt="photo of the building entrance" />', errors: [redundantAltPrefixError] },
    { code: '<img alt="picture of a flow chart" />', errors: [redundantAltPrefixError] },

    // -------------------------------------------------------------------
    // Custom component mapped to img via settings
    // -------------------------------------------------------------------
    {
      code: '<Image alt="Photo of a friend" />',
      errors: [redundantAltPrefixError],
      settings: componentsSettings,
    },

    // -------------------------------------------------------------------
    // Custom words option
    // -------------------------------------------------------------------
    { code: '<img alt="Word1" />;', options: array, errors: [redundantAltError] },
    { code: '<img alt="Word2" />;', options: array, errors: [redundantAltError] },
    { code: '<Image alt="Word1" />;', options: array, errors: [redundantAltError] },
    { code: '<Image alt="Word2" />;', options: array, errors: [redundantAltError] },

    // -------------------------------------------------------------------
    // Non-ASCII exact-word match
    // -------------------------------------------------------------------
    { code: '<img alt="イメージ" />', options: [{ words: ['イメージ'] }], errors: [redundantAltError] },
  )).map(parserOptionsMapper),
});
