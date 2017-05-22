/* eslint-env jest */
/**
 * @fileoverview Performs validity check on anchor hrefs. Warns when anchors are used as buttons.
 * @author Almero Steyn
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/anchor-is-valid';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const preferButtonErrorMessage = 'Anchor used as a button. ' +
  'Anchors are primarily expected to navigate. ' +
  'Use the button element instead.';

const noHrefErrorMessage = 'The href attribute is required on an anchor. ' +
  'Provide a valid, navigable address as the href value.';

const invalidHrefErrorMessage = 'The href attribute requires a valid address. ' +
  'Provide a valid, navigable address as the href value.';

const preferButtonexpectedError = {
  message: preferButtonErrorMessage,
  type: 'JSXOpeningElement',
};
const noHrefexpectedError = {
  message: noHrefErrorMessage,
  type: 'JSXOpeningElement',
};
const invalidHrefexpectedError = {
  message: invalidHrefErrorMessage,
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

ruleTester.run('anchor-is-valid', rule, {
  valid: [
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<a {...props} />' },
    { code: '<a href="foo" />' },
    { code: '<a href={foo} />' },
    { code: '<a href="/foo" />' },
    { code: '<div href="foo" />' },
    { code: '<a href={`${undefined}foo`}/>' },
    { code: '<a href={`#${undefined}foo`}/>' },
    { code: '<a href={`#foo`}/>' },
    { code: '<a href={"foo"}/>' },
    { code: '<a href="#foo" />' },
    { code: '<UX.Layout>test</UX.Layout>' },
    { code: '<a href={this} />' },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Anchor {...props} />', options: components },
    { code: '<Anchor href="foo" />', options: components },
    { code: '<Anchor href={foo} />', options: components },
    { code: '<Anchor href="/foo" />', options: components },
    { code: '<div href="foo" />', options: components },
    { code: '<Anchor href={`${undefined}foo`}/>', options: components },
    { code: '<Anchor href={`#${undefined}foo`}/>', options: components },
    { code: '<Anchor href={`#foo`}/>', options: components },
    { code: '<Anchor href={"foo"}/>', options: components },
    { code: '<Anchor href="#foo" />', options: components },
    { code: '<Link {...props} />', options: components },
    { code: '<Link href="foo" />', options: components },
    { code: '<Link href={foo} />', options: components },
    { code: '<Link href="/foo" />', options: components },
    { code: '<div href="foo" />', options: components },
    { code: '<Link href={`${undefined}foo`}/>', options: components },
    { code: '<Link href={`#${undefined}foo`}/>', options: components },
    { code: '<Link href={`#foo`}/>', options: components },
    { code: '<Link href={"foo"}/>', options: components },
    { code: '<Link href="#foo" />', options: components },

    // CUSTOM PROP TESTS
    { code: '<a {...props} />', options: specialLink },
    { code: '<a hrefLeft="foo" />', options: specialLink },
    { code: '<a hrefLeft={foo} />', options: specialLink },
    { code: '<a hrefLeft="/foo" />', options: specialLink },
    { code: '<div hrefLeft="foo" />', options: specialLink },
    { code: '<a hrefLeft={`${undefined}foo`}/>', options: specialLink },
    { code: '<a hrefLeft={`#${undefined}foo`}/>', options: specialLink },
    { code: '<a hrefLeft={`#foo`}/>', options: specialLink },
    { code: '<a hrefLeft={"foo"}/>', options: specialLink },
    { code: '<a hrefLeft="#foo" />', options: specialLink },
    { code: '<UX.Layout>test</UX.Layout>', options: specialLink },
    { code: '<a hrefRight={this} />', options: specialLink },
    { code: '<a {...props} />', options: specialLink },
    { code: '<a hrefRight="foo" />', options: specialLink },
    { code: '<a hrefRight={foo} />', options: specialLink },
    { code: '<a hrefRight="/foo" />', options: specialLink },
    { code: '<div hrefRight="foo" />', options: specialLink },
    { code: '<a hrefRight={`${undefined}foo`}/>', options: specialLink },
    { code: '<a hrefRight={`#${undefined}foo`}/>', options: specialLink },
    { code: '<a hrefRight={`#foo`}/>', options: specialLink },
    { code: '<a hrefRight={"foo"}/>', options: specialLink },
    { code: '<a hrefRight="#foo" />', options: specialLink },
    { code: '<UX.Layout>test</UX.Layout>', options: specialLink },
    { code: '<a hrefRight={this} />', options: specialLink },

    // CUSTOM BOTH COMPONENTS AND SPECIALLINK TESTS
    { code: '<Anchor {...props} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="foo" />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={foo} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="/foo" />', options: componentsAndSpecialLink },
    { code: '<div hrefLeft="foo" />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`${undefined}foo`}/>', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`#${undefined}foo`}/>', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`#foo`}/>', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={"foo"}/>', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="#foo" />', options: componentsAndSpecialLink },
    { code: '<UX.Layout>test</UX.Layout>', options: componentsAndSpecialLink },

    // WITH ONCLICK
    // DEFAULT ELEMENT 'a' TESTS
    { code: '<a {...props} onClick={() => void 0} />' },
    { code: '<a href="foo" onClick={() => void 0} />' },
    { code: '<a href={foo} onClick={() => void 0} />' },
    { code: '<a href="/foo" onClick={() => void 0} />' },
    { code: '<div href="foo" onClick={() => void 0} />' },
    { code: '<a href={`${undefined}foo`} onClick={() => void 0} />' },
    { code: '<a href={`#${undefined}foo`} onClick={() => void 0} />' },
    { code: '<a href={`#foo`} onClick={() => void 0} />' },
    { code: '<a href={"foo"} onClick={() => void 0} />' },
    { code: '<a href="#foo" onClick={() => void 0} />' },
    { code: '<a href={this} onClick={() => void 0} />' },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    { code: '<Anchor {...props} onClick={() => void 0} />', options: components },
    { code: '<Anchor href="foo" onClick={() => void 0} />', options: components },
    { code: '<Anchor href={foo} onClick={() => void 0} />', options: components },
    { code: '<Anchor href="/foo" onClick={() => void 0} />', options: components },
    { code: '<Anchor href={`${undefined}foo`} onClick={() => void 0} />', options: components },
    { code: '<Anchor href={`#${undefined}foo`} onClick={() => void 0} />', options: components },
    { code: '<Anchor href={`#foo`} onClick={() => void 0} />', options: components },
    { code: '<Anchor href={"foo"} onClick={() => void 0} />', options: components },
    { code: '<Anchor href="#foo" onClick={() => void 0} />', options: components },
    { code: '<Link {...props} onClick={() => void 0} />', options: components },
    { code: '<Link href="foo" onClick={() => void 0} />', options: components },
    { code: '<Link href={foo} onClick={() => void 0} />', options: components },
    { code: '<Link href="/foo" onClick={() => void 0} />', options: components },
    { code: '<div href="foo" onClick={() => void 0} />', options: components },
    { code: '<Link href={`${undefined}foo`} onClick={() => void 0} />', options: components },
    { code: '<Link href={`#${undefined}foo`} onClick={() => void 0} />', options: components },
    { code: '<Link href={`#foo`} onClick={() => void 0} />', options: components },
    { code: '<Link href={"foo"} onClick={() => void 0} />', options: components },
    { code: '<Link href="#foo" onClick={() => void 0} />', options: components },

    // CUSTOM PROP TESTS
    { code: '<a {...props} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft="foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft={foo} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft="/foo" onClick={() => void 0} />', options: specialLink },
    { code: '<div hrefLeft="foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft={`${undefined}foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft={`#${undefined}foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft={`#foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft={"foo"} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefLeft="#foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={this} onClick={() => void 0} />', options: specialLink },
    { code: '<a {...props} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight="foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={foo} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight="/foo" onClick={() => void 0} />', options: specialLink },
    { code: '<div hrefRight="foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={`${undefined}foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={`#${undefined}foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={`#foo`} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={"foo"} onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight="#foo" onClick={() => void 0} />', options: specialLink },
    { code: '<a hrefRight={this} onClick={() => void 0} />', options: specialLink },

    // CUSTOM BOTH COMPONENTS AND SPECIALLINK TESTS
    { code: '<Anchor {...props} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="foo" onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={foo} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="/foo" onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`${undefined}foo`} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`#${undefined}foo`} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={`#foo`} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={"foo"} onClick={() => void 0} />', options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="#foo" onClick={() => void 0} />', options: componentsAndSpecialLink },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT 'a' TESTS
    // NO HREF
    { code: '<a />', errors: [noHrefexpectedError] },
    { code: '<a href={undefined} />', errors: [noHrefexpectedError] },
    { code: '<a href={null} />', errors: [noHrefexpectedError] },
    // INVALID HREF
    { code: '<a href="" />;', errors: [invalidHrefexpectedError] },
    { code: '<a href="#" />', errors: [invalidHrefErrorMessage] },
    { code: '<a href={"#"} />', errors: [invalidHrefErrorMessage] },
    { code: '<a href={`#${undefined}`} />', errors: [invalidHrefErrorMessage] },
    { code: '<a href={`${undefined}`} />', errors: [invalidHrefErrorMessage] },
    { code: '<a href="javascript:void(0)" />', errors: [invalidHrefexpectedError] },
    { code: '<a href={"javascript:void(0)"} />', errors: [invalidHrefexpectedError] },
    // SHOULD BE BUTTON
    { code: '<a onClick={() => void 0} />', errors: [preferButtonexpectedError] },
    { code: '<a href="#" onClick={() => void 0} />', errors: [preferButtonexpectedError] },
    { code: '<a href="javascript:void(0)" onClick={() => void 0} />', errors: [preferButtonexpectedError] },
    {
      code: '<a href={"javascript:void(0)"} onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
    },

    // CUSTOM ELEMENT TEST FOR ARRAY OPTION
    // NO HREF
    { code: '<Link />', errors: [noHrefexpectedError], options: components },
    { code: '<Link href={undefined} />', errors: [noHrefexpectedError], options: components },
    { code: '<Link href={null} />', errors: [noHrefexpectedError], options: components },
    // INVALID HREF
    { code: '<Link href="" />', errors: [invalidHrefexpectedError], options: components },
    { code: '<Link href="#" />', errors: [invalidHrefErrorMessage], options: components },
    { code: '<Link href={"#"} />', errors: [invalidHrefErrorMessage], options: components },
    {
      code: '<Link href={`#${undefined}`} />',
      errors: [invalidHrefErrorMessage],
      options: components,
    },
    { code: '<Link href="javascript:void(0)" />', errors: [invalidHrefexpectedError], options: components },
    { code: '<Link href={"javascript:void(0)"} />', errors: [invalidHrefexpectedError], options: components },
    { code: '<Anchor href="" />', errors: [invalidHrefexpectedError], options: components },
    { code: '<Anchor href="#" />', errors: [invalidHrefErrorMessage], options: components },
    { code: '<Anchor href={"#"} />', errors: [invalidHrefErrorMessage], options: components },
    {
      code: '<Anchor href={`#${undefined}`} />',
      errors: [invalidHrefErrorMessage],
      options: components,
    },
    { code: '<Anchor href="javascript:void(0)" />', errors: [invalidHrefexpectedError], options: components },
    { code: '<Anchor href={"javascript:void(0)"} />', errors: [invalidHrefexpectedError], options: components },
    // SHOULD BE BUTTON
    { code: '<Link onClick={() => void 0} />', errors: [preferButtonexpectedError], options: components },
    { code: '<Link href="#" onClick={() => void 0} />', errors: [preferButtonexpectedError], options: components },
    {
      code: '<Link href="javascript:void(0)" onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: components,
    },
    {
      code: '<Link href={"javascript:void(0)"} onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: components,
    },
    { code: '<Anchor onClick={() => void 0} />', errors: [preferButtonexpectedError], options: components },
    { code: '<Anchor href="#" onClick={() => void 0} />', errors: [preferButtonexpectedError], options: components },
    {
      code: '<Anchor href="javascript:void(0)" onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: components,
    },
    {
      code: '<Anchor href={"javascript:void(0)"} onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: components,
    },

    // CUSTOM PROP TESTS
    // NO HREF
    { code: '<a hrefLeft={undefined} />', errors: [noHrefexpectedError], options: specialLink },
    { code: '<a hrefLeft={null} />', errors: [noHrefexpectedError], options: specialLink },
    // INVALID HREF
    { code: '<a hrefLeft="" />;', errors: [invalidHrefexpectedError], options: specialLink },
    { code: '<a hrefLeft="#" />', errors: [invalidHrefErrorMessage], options: specialLink },
    { code: '<a hrefLeft={"#"} />', errors: [invalidHrefErrorMessage], options: specialLink },
    { code: '<a hrefLeft={`#${undefined}`} />', errors: [invalidHrefErrorMessage], options: specialLink },
    { code: '<a hrefLeft={`${undefined}`} />', errors: [invalidHrefErrorMessage], options: specialLink },
    { code: '<a hrefLeft="javascript:void(0)" />', errors: [invalidHrefexpectedError], options: specialLink },
    { code: '<a hrefLeft={"javascript:void(0)"} />', errors: [invalidHrefexpectedError], options: specialLink },
    // SHOULD BE BUTTON
    { code: '<a hrefLeft="#" onClick={() => void 0} />', errors: [preferButtonexpectedError], options: specialLink },
    {
      code: '<a hrefLeft="javascript:void(0)" onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: specialLink,
    },
    {
      code: '<a hrefLeft={"javascript:void(0)"} onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: specialLink,
    },

    // CUSTOM BOTH COMPONENTS AND SPECIALLINK TESTS
    // NO HREF
    { code: '<Anchor Anchor={undefined} />', errors: [noHrefexpectedError], options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={null} />', errors: [noHrefexpectedError], options: componentsAndSpecialLink },
    // INVALID HREF
    { code: '<Anchor hrefLeft="" />;', errors: [invalidHrefexpectedError], options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft="#" />', errors: [invalidHrefErrorMessage], options: componentsAndSpecialLink },
    { code: '<Anchor hrefLeft={"#"} />', errors: [invalidHrefErrorMessage], options: componentsAndSpecialLink },
    {
      code: '<Anchor hrefLeft={`#${undefined}`} />',
      errors: [invalidHrefErrorMessage],
      options: componentsAndSpecialLink,
    },
    {
      code: '<Anchor hrefLeft={`${undefined}`} />',
      errors: [invalidHrefErrorMessage],
      options: componentsAndSpecialLink,
    },
    {
      code: '<Anchor hrefLeft="javascript:void(0)" />',
      errors: [invalidHrefexpectedError],
      options: componentsAndSpecialLink,
    },
    {
      code: '<Anchor hrefLeft={"javascript:void(0)"} />',
      errors: [invalidHrefexpectedError],
      options: componentsAndSpecialLink,
    },
    // SHOULD BE BUTTON
    {
      code: '<Anchor hrefLeft="#" onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: componentsAndSpecialLink,
    },
    {
      code: '<Anchor hrefLeft="javascript:void(0)" onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: componentsAndSpecialLink,
    },
    {
      code: '<Anchor hrefLeft={"javascript:void(0)"} onClick={() => void 0} />',
      errors: [preferButtonexpectedError],
      options: componentsAndSpecialLink,
    },
  ].map(parserOptionsMapper),
});
