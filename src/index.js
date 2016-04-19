'use strict';

module.exports = {
  rules: {
    'img-has-alt': require('./rules/img-has-alt'),
    'img-redundant-alt': require('./rules/img-redundant-alt'),
    'onclick-has-role': require('./rules/onclick-has-role'),
    'mouse-events-have-key-events': require('./rules/mouse-events-have-key-events'),
    'use-onblur-not-onchange': require('./rules/use-onblur-not-onchange'),
    'no-access-key': require('./rules/no-access-key'),
    'label-has-for': require('./rules/label-has-for'),
    'href-no-hash': require('./rules/href-no-hash'),
    'valid-aria-role': require('./rules/valid-aria-role'),
    'valid-aria-proptypes': require('./rules/valid-aria-proptypes'),
    'aria-props': require('./rules/aria-props'),
    'role-requires-aria': require('./rules/role-requires-aria'),
    'aria-unsupported-elements': require('./rules/aria-unsupported-elements'),
    'tabindex-no-positive': require('./rules/tabindex-no-positive'),
    'onclick-has-focus': require('./rules/onclick-has-focus'),
    'role-supports-aria-props': require('./rules/role-supports-aria-props')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'jsx-a11y/img-has-alt': 2,
        'jsx-a11y/img-redundant-alt': 2,
        'jsx-a11y/onclick-has-role': 2,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/use-onblur-not-onchange': 2,
        'jsx-a11y/no-access-key': 2,
        'jsx-a11y/label-has-for': 2,
        'jsx-a11y/href-no-hash': 2,
        'jsx-a11y/valid-aria-role': 2,
        'jsx-a11y/valid-aria-proptypes': 2,
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/role-requires-aria': 2,
        'jsx-a11y/aria-unsupported-elements': 2,
        'jsx-a11y/tabindex-no-positive': 2,
        'jsx-a11y/role-supports-aria-props': 2
      }
    }
  }
};
