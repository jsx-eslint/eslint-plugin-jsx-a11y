/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/href-no-hash';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Links must not point to "#". Use a more descriptive href or use a button instead.',
  type: 'JSXOpeningElement',
};

const string = [{
  components: 'Link',
}];
const array = [{
  components: ['Anchor', 'Link'],
}];
const props = [{
  props: ['hrefLeft', 'hrefRight'],
}];

ruleTester.run('href-no-hash', rule, {
  valid: [
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<a />;', parserOptions },
    { code: '<a {...props} />', parserOptions },
    { code: '<a href="foo" />', parserOptions },
    { code: '<a href={foo} />', parserOptions },
    { code: '<a href="/foo" />', parserOptions },
    { code: '<a href={`${undefined}`} />', parserOptions },
    { code: '<div href="foo" />', parserOptions },
    { code: '<a href={`${undefined}foo`}/>', parserOptions },
    { code: '<a href={`#${undefined}foo`}/>', parserOptions },
    { code: '<a href={`#foo`}/>', parserOptions },
    { code: '<a href={"foo"}/>', parserOptions },
    { code: '<a href="#foo" />', parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', parserOptions },
    { code: '<a href={this} />', parserOptions },

    // CUSTOM ELEMENT TEST FOR STRING OPTION
    { code: '<Link />;', options: string, parserOptions },
    { code: '<Link {...props} />', options: string, parserOptions },
    { code: '<Link href="foo" />', options: string, parserOptions },
    { code: '<Link href={foo} />', options: string, parserOptions },
    { code: '<Link href="/foo" />', options: string, parserOptions },
    { code: '<Link href={`${undefined}`} />', options: string, parserOptions },
    { code: '<div href="foo" />', options: string, parserOptions },
    { code: '<Link href={`${undefined}foo`}/>', options: string, parserOptions },
    { code: '<Link href={`#${undefined}foo`}/>', options: string, parserOptions },
    { code: '<Link href={`#foo`}/>', options: string, parserOptions },
    { code: '<Link href={"foo"}/>', options: string, parserOptions },
    { code: '<Link href="#foo" />', options: string, parserOptions },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Anchor />;', options: array, parserOptions },
    { code: '<Anchor {...props} />', options: array, parserOptions },
    { code: '<Anchor href="foo" />', options: array, parserOptions },
    { code: '<Anchor href={foo} />', options: array, parserOptions },
    { code: '<Anchor href="/foo" />', options: array, parserOptions },
    { code: '<Anchor href={`${undefined}`} />', options: array, parserOptions },
    { code: '<div href="foo" />', options: array, parserOptions },
    { code: '<Anchor href={`${undefined}foo`}/>', options: array, parserOptions },
    { code: '<Anchor href={`#${undefined}foo`}/>', options: array, parserOptions },
    { code: '<Anchor href={`#foo`}/>', options: array, parserOptions },
    { code: '<Anchor href={"foo"}/>', options: array, parserOptions },
    { code: '<Anchor href="#foo" />', options: array, parserOptions },
    { code: '<Link />;', options: array, parserOptions },
    { code: '<Link {...props} />', options: array, parserOptions },
    { code: '<Link href="foo" />', options: array, parserOptions },
    { code: '<Link href={foo} />', options: array, parserOptions },
    { code: '<Link href="/foo" />', options: array, parserOptions },
    { code: '<Link href={`${undefined}`} />', options: array, parserOptions },
    { code: '<div href="foo" />', options: array, parserOptions },
    { code: '<Link href={`${undefined}foo`}/>', options: array, parserOptions },
    { code: '<Link href={`#${undefined}foo`}/>', options: array, parserOptions },
    { code: '<Link href={`#foo`}/>', options: array, parserOptions },
    { code: '<Link href={"foo"}/>', options: array, parserOptions },
    { code: '<Link href="#foo" />', options: array, parserOptions },

    // CUSTOM PROP TESTS
    { code: '<a />;', options: props, parserOptions },
    { code: '<a {...props} />', options: props, parserOptions },
    { code: '<a hrefLeft="foo" />', options: props, parserOptions },
    { code: '<a hrefLeft={foo} />', options: props, parserOptions },
    { code: '<a hrefLeft="/foo" />', options: props, parserOptions },
    { code: '<a hrefLeft={`${undefined}`} />', options: props, parserOptions },
    { code: '<div hrefLeft="foo" />', options: props, parserOptions },
    { code: '<a hrefLeft={`${undefined}foo`}/>', options: props, parserOptions },
    { code: '<a hrefLeft={`#${undefined}foo`}/>', options: props, parserOptions },
    { code: '<a hrefLeft={`#foo`}/>', options: props, parserOptions },
    { code: '<a hrefLeft={"foo"}/>', options: props, parserOptions },
    { code: '<a hrefLeft="#foo" />', options: props, parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', options: props, parserOptions },
    { code: '<a hrefRight={this} />', options: props, parserOptions },
    { code: '<a />;', options: props, parserOptions },
    { code: '<a {...props} />', options: props, parserOptions },
    { code: '<a hrefRight="foo" />', options: props, parserOptions },
    { code: '<a hrefRight={foo} />', options: props, parserOptions },
    { code: '<a hrefRight="/foo" />', options: props, parserOptions },
    { code: '<a hrefRight={`${undefined}`} />', options: props, parserOptions },
    { code: '<div hrefRight="foo" />', options: props, parserOptions },
    { code: '<a hrefRight={`${undefined}foo`}/>', options: props, parserOptions },
    { code: '<a hrefRight={`#${undefined}foo`}/>', options: props, parserOptions },
    { code: '<a hrefRight={`#foo`}/>', options: props, parserOptions },
    { code: '<a hrefRight={"foo"}/>', options: props, parserOptions },
    { code: '<a hrefRight="#foo" />', options: props, parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', options: props, parserOptions },
    { code: '<a hrefRight={this} />', options: props, parserOptions },
  ],
  invalid: [
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<a href="#" />', errors: [expectedError], parserOptions },
    { code: '<a href={"#"} />', errors: [expectedError], parserOptions },
    { code: '<a href={`#${undefined}`} />', errors: [expectedError], parserOptions },

    // CUSTOM ELEMENT TEST FOR STRING OPTION
    { code: '<Link href="#" />', errors: [expectedError], options: string, parserOptions },
    { code: '<Link href={"#"} />', errors: [expectedError], options: string, parserOptions },
    {
      code: '<Link href={`#${undefined}`} />',
      errors: [expectedError],
      options: string,
      parserOptions,
    },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Link href="#" />', errors: [expectedError], options: array, parserOptions },
    { code: '<Link href={"#"} />', errors: [expectedError], options: array, parserOptions },
    {
      code: '<Link href={`#${undefined}`} />',
      errors: [expectedError],
      options: array,
      parserOptions,
    },
    { code: '<Anchor href="#" />', errors: [expectedError], options: array, parserOptions },
    { code: '<Anchor href={"#"} />', errors: [expectedError], options: array, parserOptions },
    {
      code: '<Anchor href={`#${undefined}`} />',
      errors: [expectedError],
      options: array,
      parserOptions,
    },

    // CUSTOM PROP TESTS
    { code: '<a hrefLeft="#" />', errors: [expectedError], options: props, parserOptions },
    { code: '<a hrefLeft={"#"} />', errors: [expectedError], options: props, parserOptions },
    {
      code: '<a hrefLeft={`#${undefined}`} />',
      errors: [expectedError],
      options: props,
      parserOptions,
    },
    { code: '<a hrefRight="#" />', errors: [expectedError], options: props, parserOptions },
    { code: '<a hrefRight={"#"} />', errors: [expectedError], options: props, parserOptions },
    {
      code: '<a hrefRight={`#${undefined}`} />',
      errors: [expectedError],
      options: props,
      parserOptions,
    },
  ],
});
