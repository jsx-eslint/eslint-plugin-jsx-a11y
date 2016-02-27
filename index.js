'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./lib/rules/img-uses-alt'),
    'onClick-uses-role': require('./lib/rules/onClick-uses-role')
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
