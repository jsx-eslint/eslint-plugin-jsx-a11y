'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./rules/img-uses-alt'),
    'onClick-uses-role': require('./rules/onClick-uses-role'),
    'mouseEvents-require-keyEvents': require('./rules/mouseEvents-require-keyEvents'),
    'use-onblur-not-onchange': require('./rules/use-onblur-not-onchange'),
    'no-access-key': require('./rules/no-access-key'),
    'use-label-for': require('./rules/use-label-for')
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
