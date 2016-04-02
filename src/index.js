'use strict';

module.exports = {
  rules: {
    'img-uses-alt': require('./rules/img-uses-alt'),
    'redundant-alt': require('./rules/redundant-alt'),
    'onclick-uses-role': require('./rules/onclick-uses-role'),
    'mouse-events-map-to-key-events': require('./rules/mouse-events-map-to-key-events'),
    'use-onblur-not-onchange': require('./rules/use-onblur-not-onchange'),
    'no-access-key': require('./rules/no-access-key'),
    'label-uses-for': require('./rules/label-uses-for'),
    'no-hash-href': require('./rules/no-hash-href'),
    'valid-aria-role': require('./rules/valid-aria-role')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "jsx-a11y/img-uses-alt": 2,
        "jsx-a11y/redundant-alt": 2,
        "jsx-a11y/onclick-uses-role": 2,
        "jsx-a11y/mouse-events-map-to-key-events": 2,
        "jsx-a11y/use-onblur-not-onchange": 2,
        "jsx-a11y/no-access-key": 2,
        "jsx-a11y/label-uses-for": 2,
        "jsx-a11y/no-hash-href": 2,
        "jsx-a11y/valid-aria-role": 2
      }
    }
  }
};
