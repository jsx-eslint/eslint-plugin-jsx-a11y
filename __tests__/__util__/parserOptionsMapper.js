import { version as eslintVersion } from 'eslint/package.json';
import semver from 'semver';

const usingLegacy = semver.major(eslintVersion) < 9;

const defaultParserOptions = {
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};

const defaultLegacyParserOptions = {
  ...defaultParserOptions,
  ecmaVersion: 2018,
};

const defaultLanguageOptions = {
  ecmaVersion: 'latest',
  parserOptions: {
    ...defaultParserOptions,
  },
};

export default function parserOptionsMapper({
  code,
  errors,
  output,
  options = [],
  languageOptions = {},
  settings = {},
}) {
  return usingLegacy
    ? {
      code,
      errors,
      ...(output !== undefined && { output }),
      options,
      parserOptions: {
        ...defaultLegacyParserOptions,
        ...languageOptions,
      },
      settings,
    }
    : {
      code,
      errors,
      ...(output !== undefined && { output }),
      options,
      languageOptions: {
        ...defaultLanguageOptions,
        ...languageOptions,
      },
      settings,
    };
}
