/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit default role property on element.
 * @author Ethan Cohen <@evcohen>
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import parsers from '../../__util__/helpers/parsers';
import rule from '../../../src/rules/no-redundant-roles';
import ruleOptionsMapperFactory from '../../__util__/ruleOptionsMapperFactory';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = (element, implicitRole) => ({
  message: `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`,
  type: 'JSXOpeningElement',
});

const ruleName = 'jsx-a11y/no-redundant-roles';

const componentsSettings = {
  'jsx-a11y': {
    components: {
      Button: 'button',
    },
  },
};

const alwaysValid = [
  { code: '<div />;' },
  { code: '<button role="main" />' },
  { code: '<MyComponent role="button" />' },
  { code: '<button role={`${foo}button`} />' },
  { code: '<Button role={`${foo}button`} />', settings: componentsSettings },
  { code: '<select role="menu"><option>1</option><option>2</option></select>' },
  { code: '<select role="menu" size={2}><option>1</option><option>2</option></select>' },
  { code: '<select role="menu" multiple><option>1</option><option>2</option></select>' },
];

const neverValid = [
  { code: '<body role="DOCUMENT" />', errors: [expectedError('body', 'document')] },
  // button - treated as button by default
  { code: '<button role="button" />', errors: [expectedError('button', 'button')] },
  { code: '<Button role="button" />', settings: componentsSettings, errors: [expectedError('button', 'button')] },
  // select - treated as combobox by default
  { code: '<select role="combobox"><option>1</option><option>2</option></select>', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" size="" />', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" size={1} />', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" size="1" />', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" size={null}></select>', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" size={undefined}></select>', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" multiple={undefined}></select>', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" multiple={false}></select>', errors: [expectedError('select', 'combobox')] },
  { code: '<select role="combobox" multiple=""></select>', errors: [expectedError('select', 'combobox')] },
  // select - treated as listbox when multiple OR size > 1
  { code: '<select role="listbox" size="3" />', errors: [expectedError('select', 'listbox')] },
  { code: '<select role="listbox" size={2} />', errors: [expectedError('select', 'listbox')] },
  { code: '<select role="listbox" multiple><option>1</option><option>2</option></select>', errors: [expectedError('select', 'listbox')] },
  { code: '<select role="listbox" multiple={true}></select>', errors: [expectedError('select', 'listbox')] },
];

ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: parsers.all([].concat(
    ...alwaysValid,
    { code: '<nav role="navigation" />' },
  ))
    .map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    neverValid,
  ))
    .map(parserOptionsMapper),
});

const noNavExceptionsOptions = { nav: [] };
const listException = { ul: ['list'], ol: ['list'] };

ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: parsers.all([].concat(
    alwaysValid
      .map(ruleOptionsMapperFactory(noNavExceptionsOptions)),
  ))
    .map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    ...neverValid,
    { code: '<nav role="navigation" />', errors: [expectedError('nav', 'navigation')] },
  ))
    .map(ruleOptionsMapperFactory(noNavExceptionsOptions))
    .map(parserOptionsMapper),
});

ruleTester.run(`${ruleName}:recommended (valid list role override)`, rule, {
  valid: parsers.all([].concat(
    { code: '<ul role="list" />' },
    { code: '<ol role="list" />' },
    { code: '<dl role="list" />' },
    { code: '<img src="example.svg" role="img" />' },
    { code: '<svg role="img" />' },
  ))
    .map(ruleOptionsMapperFactory(listException))
    .map(parserOptionsMapper),
  invalid: parsers.all([].concat(
    { code: '<ul role="list" />', errors: [expectedError('ul', 'list')] },
    { code: '<ol role="list" />', errors: [expectedError('ol', 'list')] },
    { code: '<img role="img" />', errors: [expectedError('img', 'img')] },
    { code: '<img src={someVariable} role="img" />', errors: [expectedError('img', 'img')] },
  ))
    .map(parserOptionsMapper),
});
