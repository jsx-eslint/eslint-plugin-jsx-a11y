/**
 * @fileoverview ESLint compatibility smoke tests.
 *
 * Verifies that the test infrastructure works with the currently-installed
 * ESLint version. Catches regressions in the RuleTester/tape integration
 * and version-conditional test-case behavior (e.g. error type stripping).
 */

import test from 'tape';
import { version as eslintVersion } from 'eslint/package.json';
import semver from 'semver';
import plugin from '../src';
import RuleTester from './__util__/RuleTester';
import parserOptionsMapper from './__util__/parserOptionsMapper';

const eslintMajor = semver.major(eslintVersion);

// ---------------------------------------------------------------------------
// RuleTester/tape integration smoke test
// ---------------------------------------------------------------------------
// Exercises the describe/it hooks that integrate RuleTester with tape.
// A failure here means the wrapper in __util__/RuleTester.js needs updating
// for the installed ESLint version.

const reportingRule = {
  meta: {
    type: 'suggestion',
    schema: [{ type: 'object' }],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'accessKey') {
          context.report({ node, message: 'accessKey is not allowed' });
        }
      },
    };
  },
};

const tester = new RuleTester();

// Run 1: valid + invalid — exercises full describe/it nesting
// (describe('rule') → describe('valid') → it, describe('invalid') → it)
tester.run('eslint-compat-smoke', reportingRule, {
  valid: [
    parserOptionsMapper({ code: '<div />;' }),
  ],
  invalid: [
    parserOptionsMapper({
      code: '<div accessKey="h" />',
      errors: [{ message: 'accessKey is not allowed', type: 'JSXAttribute' }],
    }),
  ],
});

// Run 2: sequential run — verifies that the wrapper's currentTest
// state is properly reset between runs. If state leaks from run 1,
// this will crash or produce wrong results.
tester.run('eslint-compat-smoke-sequential', reportingRule, {
  valid: [
    parserOptionsMapper({ code: '<span />;' }),
    parserOptionsMapper({ code: '<button />;' }),
  ],
  invalid: [
    parserOptionsMapper({
      code: '<div accessKey="h" />',
      errors: [{ message: 'accessKey is not allowed', type: 'JSXAttribute' }],
    }),
  ],
});

// Run 3: same tester instance, third sequential run — exercises repeated
// reset of describe/it nesting to catch state accumulation bugs.
tester.run('eslint-compat-smoke-third', reportingRule, {
  valid: [
    parserOptionsMapper({ code: '<span />;' }),
    parserOptionsMapper({ code: '<button />;' }),
    parserOptionsMapper({ code: '<a />;' }),
  ],
  invalid: [
    parserOptionsMapper({
      code: '<div accessKey="x" />',
      errors: [{ message: 'accessKey is not allowed', type: 'JSXAttribute' }],
    }),
    parserOptionsMapper({
      code: '<span accessKey="y" />',
      errors: [{ message: 'accessKey is not allowed', type: 'JSXAttribute' }],
    }),
  ],
});

// ---------------------------------------------------------------------------
// Config export shape
// ---------------------------------------------------------------------------

test(`ESLint ${eslintMajor}: flat config shape`, (t) => {
  const { recommended: rec, strict } = plugin.flatConfigs;

  t.ok(rec.plugins, 'recommended flat config has plugins');
  t.ok(rec.rules, 'recommended flat config has rules');
  t.ok(rec.languageOptions, 'recommended flat config has languageOptions');
  t.equal(typeof rec.languageOptions.parserOptions, 'object', 'has parserOptions in languageOptions');
  t.ok(rec.languageOptions.parserOptions.ecmaFeatures.jsx, 'jsx is enabled');

  t.ok(strict.plugins, 'strict flat config has plugins');
  t.ok(strict.rules, 'strict flat config has rules');
  t.ok(strict.languageOptions, 'strict flat config has languageOptions');

  t.end();
});
