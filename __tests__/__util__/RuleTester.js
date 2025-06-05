import test from 'tape';
import mockProperty from 'mock-property';
import { RuleTester } from 'eslint';

const orig = RuleTester.prototype.run;
RuleTester.prototype.run = function (name, rule, tests) {
  test(`RuleTester: ${name}`, (t) => {
    t.teardown(mockProperty(RuleTester.describe, 't', { value: t }));
    orig.call(this, name, rule, tests);

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
