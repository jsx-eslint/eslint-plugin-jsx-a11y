'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./rules/img-uses-alt'),
    'redundant-alt': require('./rules/redundant-alt'),
    'onclick-uses-role': require('./rules/onclick-uses-role'),
    'mouse-events-map-to-key-events': require('./rules/mouse-events-map-to-key-events'),
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
