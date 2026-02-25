import test from 'tape';
import { RuleTester } from 'eslint';

RuleTester.describe = function (text, method) {
  test(`RuleTester: ${text}`, (t) => {
    RuleTester.it.t = t;
    RuleTester.it.title = text;
    method.call(this);
    t.end();
  });
};

RuleTester.it = function (text, method) {
  RuleTester.it.t.doesNotThrow(method, `${RuleTester.it.title}: ${text}`);
};

export default RuleTester;
