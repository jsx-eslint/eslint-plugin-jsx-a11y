import test from 'tape';
import { RuleTester } from 'eslint';

// Use only the documented RuleTester.describe and RuleTester.it hooks
// to integrate with tape. This avoids overriding RuleTester.prototype.run,
// which relies on undocumented internal stack-frame assumptions that
// changed in ESLint 10.

let currentTest = null;

RuleTester.describe = function describe(text, method) {
  if (currentTest) {
    // Nested describe (e.g. 'valid', 'invalid') — create a subtest
    const parent = currentTest;
    currentTest.test(text, (t) => {
      currentTest = t;
      method.call(this);
      t.end();
      currentTest = parent;
    });
  } else {
    // Top-level describe (rule name) — create a new tape test
    test(text, (t) => {
      currentTest = t;
      method.call(this);
      t.end();
      currentTest = null;
    });
  }
};

RuleTester.it = function it(text, method) {
  currentTest.doesNotThrow(method, text);
};

export default RuleTester;
