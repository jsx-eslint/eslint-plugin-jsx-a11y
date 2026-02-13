import { version as eslintVersion } from 'eslint/package.json';
import semver from 'semver';
import fromEntries from 'object.fromentries';
import entries from 'object.entries';

const eslintMajor = semver.major(eslintVersion);
const usingLegacy = eslintMajor < 9;
const hasTestCaseErrorType = eslintMajor < 10;

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

/**
 * Strip the `type` property from error objects.
 * ESLint v10 removed `TestCaseError#type`; including it causes test failures.
 */
function stripErrorType(err) {
  if (typeof err === 'string') return err;
  return fromEntries(entries(err).filter(([key]) => key !== 'type'));
}

export default function parserOptionsMapper({
  code,
  errors,
  options = [],
  languageOptions = {},
  settings = {},
}) {
  const mappedErrors = !hasTestCaseErrorType && Array.isArray(errors)
    ? errors.map(stripErrorType)
    : errors;

  return usingLegacy
    ? {
      code,
      errors: mappedErrors,
      options,
      parserOptions: {
        ...defaultLegacyParserOptions,
        ...languageOptions,
      },
      settings,
    }
    : {
      code,
      errors: mappedErrors,
      options,
      languageOptions: {
        ...defaultLanguageOptions,
        ...languageOptions,
      },
      settings,
    };
}
