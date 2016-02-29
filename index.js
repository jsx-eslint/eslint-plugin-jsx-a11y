'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./lib/rules/img-uses-alt'),
    'onClick-uses-role': require('./lib/rules/onClick-uses-role'),
    'mouseEvents-require-keyEvents': require('./lib/rules/mouseEvents-require-keyEvents')
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
