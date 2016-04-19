/**
 * @fileoverview Enforce that elements that do not support ARIA roles, states and properties do not have those attributes.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/aria-unsupported-elements';
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

import DOM from '../../../src/util/attributes/DOM';

const errorMessage = {
  message: 'This element does not support ARIA roles, states and properties.',
  type: 'JSXOpeningElement'
};

// Generate valid test cases
const roleValidityTests = Object.keys(DOM).map(element => {
  const isReserved = DOM[element].reserved || false;
  const role = isReserved ? '' : 'role';

  return {
    code: `<${element.toLowerCase()} ${role} />`,
    parserOptions
  };
});

const ariaValidityTests = Object.keys(DOM).map(element => {
  const isReserved = DOM[element].reserved || false;
  const aria = isReserved ? '' : 'aria-hidden';

  return {
    code: `<${element.toLowerCase()} ${aria} />`,
    parserOptions
  };
});

// Generate invalid test cases.
const invalidRoleValidityTests = Object.keys(DOM)
  .filter(element => Boolean(DOM[element].reserved))
  .map(reservedElem => ({
    code: `<${reservedElem.toLowerCase()} role />`,
    errors: [ errorMessage ],
    parserOptions
  }));

const invalidAriaValidityTests = Object.keys(DOM)
  .filter(element => Boolean(DOM[element].reserved))
  .map(reservedElem => ({
    code: `<${reservedElem.toLowerCase()} aria-hidden />`,
    errors: [ errorMessage ],
    parserOptions
  }));

ruleTester.run('aria-unsupported-elements', rule, {
  valid: roleValidityTests.concat(ariaValidityTests),
  invalid: invalidRoleValidityTests.concat(invalidAriaValidityTests)
});
