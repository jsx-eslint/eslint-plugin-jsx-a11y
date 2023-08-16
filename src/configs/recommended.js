import jsxAlly from '..';

const { configs, ...plugin } = jsxAlly;

export default {
  plugins: {
    'jsx-a11y': plugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: configs.recommended.rules,
};
