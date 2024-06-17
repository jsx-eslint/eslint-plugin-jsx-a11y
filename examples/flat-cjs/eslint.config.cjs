const globals = require('globals');
const js = require('@eslint/js');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    ignores: ['dist', 'eslint.config.cjs'],
    rules: {
      'no-unused-vars': 'off',
      'jsx-a11y/anchor-ambiguous-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
    },
  },
];
