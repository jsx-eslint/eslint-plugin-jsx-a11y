import { RuleTester } from 'eslint';
import mockProperty from 'mock-property';
import test from 'tape';

const orig = RuleTester.prototype.run;
RuleTester.prototype.run = function (name, rule, tests) {
  test(`RuleTester: ${name}`, (t) => {
    t.teardown(mockProperty(RuleTester.describe, 't', { value: t }));
    const other = RuleTester.prototype;
    RuleTester.prototype.run = orig;
    orig.call(this, name, rule, tests);
    RuleTester.prototype.run = other;
    t.end();
  });
};

RuleTester.describe = function (text, method) {
  RuleTester.it.title = text;
  const self = this;
  RuleTester.describe.t.test(text, (t) => {
    t.teardown(mockProperty(RuleTester.it, 't', { value: t }));
    method.call(self);
    t.end();
  });
};

RuleTester.it = function (text, method) {
  RuleTester.it.t.doesNotThrow(method, `${RuleTester.it.title}: ${text}`);
};

export default RuleTester;
