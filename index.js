'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./lib/rules/img-uses-alt'),
    'onClick-uses-role': require('./lib/rules/onClick-uses-role'),
    'mouseEvents-require-keyEvents': require('./lib/rules/mouseEvents-require-keyEvents'),
    'use-onblur-not-onchange': require('./lib/rules/use-onblur-not-onchange'),
    'no-access-key': require('./lib/rules/no-access-key'),
    'use-label-for': require('./lib/rules/use-label-for')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
};
