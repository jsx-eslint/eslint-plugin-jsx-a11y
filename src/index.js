/* eslint-disable global-require */

module.exports = {
  rules: {
    'aria-props': require('./rules/aria-props'),
    'aria-proptypes': require('./rules/aria-proptypes'),
    'aria-role': require('./rules/aria-role'),
    'aria-unsupported-elements': require('./rules/aria-unsupported-elements'),
    'href-no-hash': require('./rules/href-no-hash'),
    'img-has-alt': require('./rules/img-has-alt'),
    'img-redundant-alt': require('./rules/img-redundant-alt'),
    'label-has-for': require('./rules/label-has-for'),
    'mouse-events-have-key-events': require('./rules/mouse-events-have-key-events'),
    'no-access-key': require('./rules/no-access-key'),
    'no-onchange': require('./rules/no-onchange'),
    'onclick-has-focus': require('./rules/onclick-has-focus'),
    'onclick-has-role': require('./rules/onclick-has-role'),
    'role-has-required-aria-props': require('./rules/role-has-required-aria-props'),
    'role-supports-aria-props': require('./rules/role-supports-aria-props'),
    'tabindex-no-positive': require('./rules/tabindex-no-positive'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/aria-proptypes': 2,
        'jsx-a11y/aria-role': 2,
        'jsx-a11y/aria-unsupported-elements': 2,
        'jsx-a11y/href-no-hash': 2,
        'jsx-a11y/img-has-alt': 2,
        'jsx-a11y/img-redundant-alt': 2,
        'jsx-a11y/label-has-for': 2,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/no-access-key': 2,
        'jsx-a11y/no-onchange': 2,
        'jsx-a11y/onclick-has-focus': 2,
        'jsx-a11y/onclick-has-role': 2,
        'jsx-a11y/role-has-required-aria-props': 2,
        'jsx-a11y/role-supports-aria-props': 2,
        'jsx-a11y/tabindex-no-positive': 2,
      },
    },
  },
};
