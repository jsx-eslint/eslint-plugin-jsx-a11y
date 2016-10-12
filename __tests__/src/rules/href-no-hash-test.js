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

const components = [{
  components: ['Anchor', 'Link'],
}];
const specialLink = [{
  specialLink: ['hrefLeft', 'hrefRight'],
}];
const componentsAndSpecialLink = [{
  components: ['Anchor'],
  specialLink: ['hrefLeft'],
}];

ruleTester.run('href-no-hash', rule, {
  valid: [
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<Anchor />;', parserOptions },
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

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Anchor />;', options: components, parserOptions },
    { code: '<Anchor {...props} />', options: components, parserOptions },
    { code: '<Anchor href="foo" />', options: components, parserOptions },
    { code: '<Anchor href={foo} />', options: components, parserOptions },
    { code: '<Anchor href="/foo" />', options: components, parserOptions },
    { code: '<Anchor href={`${undefined}`} />', options: components, parserOptions },
    { code: '<div href="foo" />', options: components, parserOptions },
    { code: '<Anchor href={`${undefined}foo`}/>', options: components, parserOptions },
    { code: '<Anchor href={`#${undefined}foo`}/>', options: components, parserOptions },
    { code: '<Anchor href={`#foo`}/>', options: components, parserOptions },
    { code: '<Anchor href={"foo"}/>', options: components, parserOptions },
    { code: '<Anchor href="#foo" />', options: components, parserOptions },
    { code: '<Link />;', options: components, parserOptions },
    { code: '<Link {...props} />', options: components, parserOptions },
    { code: '<Link href="foo" />', options: components, parserOptions },
    { code: '<Link href={foo} />', options: components, parserOptions },
    { code: '<Link href="/foo" />', options: components, parserOptions },
    { code: '<Link href={`${undefined}`} />', options: components, parserOptions },
    { code: '<div href="foo" />', options: components, parserOptions },
    { code: '<Link href={`${undefined}foo`}/>', options: components, parserOptions },
    { code: '<Link href={`#${undefined}foo`}/>', options: components, parserOptions },
    { code: '<Link href={`#foo`}/>', options: components, parserOptions },
    { code: '<Link href={"foo"}/>', options: components, parserOptions },
    { code: '<Link href="#foo" />', options: components, parserOptions },

    // CUSTOM PROP TESTS
    { code: '<a />;', options: specialLink, parserOptions },
    { code: '<a {...props} />', options: specialLink, parserOptions },
    { code: '<a hrefLeft="foo" />', options: specialLink, parserOptions },
    { code: '<a hrefLeft={foo} />', options: specialLink, parserOptions },
    { code: '<a hrefLeft="/foo" />', options: specialLink, parserOptions },
    { code: '<a hrefLeft={`${undefined}`} />', options: specialLink, parserOptions },
    { code: '<div hrefLeft="foo" />', options: specialLink, parserOptions },
    { code: '<a hrefLeft={`${undefined}foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefLeft={`#${undefined}foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefLeft={`#foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefLeft={"foo"}/>', options: specialLink, parserOptions },
    { code: '<a hrefLeft="#foo" />', options: specialLink, parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', options: specialLink, parserOptions },
    { code: '<a hrefRight={this} />', options: specialLink, parserOptions },
    { code: '<a />;', options: specialLink, parserOptions },
    { code: '<a {...props} />', options: specialLink, parserOptions },
    { code: '<a hrefRight="foo" />', options: specialLink, parserOptions },
    { code: '<a hrefRight={foo} />', options: specialLink, parserOptions },
    { code: '<a hrefRight="/foo" />', options: specialLink, parserOptions },
    { code: '<a hrefRight={`${undefined}`} />', options: specialLink, parserOptions },
    { code: '<div hrefRight="foo" />', options: specialLink, parserOptions },
    { code: '<a hrefRight={`${undefined}foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefRight={`#${undefined}foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefRight={`#foo`}/>', options: specialLink, parserOptions },
    { code: '<a hrefRight={"foo"}/>', options: specialLink, parserOptions },
    { code: '<a hrefRight="#foo" />', options: specialLink, parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', options: specialLink, parserOptions },
    { code: '<a hrefRight={this} />', options: specialLink, parserOptions },

    // CUSTOM BOTH COMPONENTS AND SPECIALLINK TESTS
    { code: '<Anchor />;', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor {...props} />', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft="foo" />', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={foo} />', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft="/foo" />', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={`${undefined}`} />', options: componentsAndSpecialLink, parserOptions },
    { code: '<div hrefLeft="foo" />', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={`${undefined}foo`}/>', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={`#${undefined}foo`}/>', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={`#foo`}/>', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={"foo"}/>', options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft="#foo" />', options: componentsAndSpecialLink, parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', options: componentsAndSpecialLink, parserOptions },
  ],
  invalid: [
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<a href="#" />', errors: [expectedError], parserOptions },
    { code: '<a href={"#"} />', errors: [expectedError], parserOptions },
    { code: '<a href={`#${undefined}`} />', errors: [expectedError], parserOptions },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Link href="#" />', errors: [expectedError], options: components, parserOptions },
    { code: '<Link href={"#"} />', errors: [expectedError], options: components, parserOptions },
    {
      code: '<Link href={`#${undefined}`} />',
      errors: [expectedError],
      options: components,
      parserOptions,
    },
    { code: '<Anchor href="#" />', errors: [expectedError], options: components, parserOptions },
    { code: '<Anchor href={"#"} />', errors: [expectedError], options: components, parserOptions },
    {
      code: '<Anchor href={`#${undefined}`} />',
      errors: [expectedError],
      options: components,
      parserOptions,
    },

    // CUSTOM PROP TESTS
    { code: '<a hrefLeft="#" />', errors: [expectedError], options: specialLink, parserOptions },
    { code: '<a hrefLeft={"#"} />', errors: [expectedError], options: specialLink, parserOptions },
    {
      code: '<a hrefLeft={`#${undefined}`} />',
      errors: [expectedError],
      options: specialLink,
      parserOptions,
    },
    { code: '<a hrefRight="#" />', errors: [expectedError], options: specialLink, parserOptions },
    { code: '<a hrefRight={"#"} />', errors: [expectedError], options: specialLink, parserOptions },
    {
      code: '<a hrefRight={`#${undefined}`} />',
      errors: [expectedError],
      options: specialLink,
      parserOptions,
    },

    // CUSTOM BOTH COMPONENTS AND SPECIALLINK TESTS
    { code: '<Anchor hrefLeft="#" />', errors: [expectedError], options: componentsAndSpecialLink, parserOptions },
    { code: '<Anchor hrefLeft={"#"} />', errors: [expectedError], options: componentsAndSpecialLink, parserOptions },
    {
      code: '<Anchor hrefLeft={`#${undefined}`} />',
      errors: [expectedError],
      options: componentsAndSpecialLink,
      parserOptions,
    },
  ],
});
