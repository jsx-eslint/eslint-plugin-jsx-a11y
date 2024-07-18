import { version as eslintVersion } from 'eslint/package.json';
import expect from 'expect';
import semver from 'semver';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';

const usingLegacy = semver.major(eslintVersion) < 9;

describe('parserOptionsMapper', () => {
  it('should return an test case object', () => {
    const testCase = {
      code: '<div />',
      errors: [],
      options: {},
    };

    const expectedResult = usingLegacy
      ? {
        code: '<div />',
        errors: [],
        options: {},
        parserOptions: {
          ecmaVersion: 2018,
          ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
          },
        },
        settings: {},
      }
      : {
        code: '<div />',
        errors: [],
        options: {},
        languageOptions: {
          ecmaVersion: 'latest',
          parserOptions: {
            ecmaFeatures: {
              experimentalObjectRestSpread: true,
              jsx: true,
            },
          },
        },
        settings: {},
      };
    expect(parserOptionsMapper(testCase)).toEqual(expectedResult);
  });
  it('should allow for overriding parserOptions', () => {
    const testCase = {
      code: '<div />',
      errors: [],
      options: {},
      languageOptions: {
        ecmaVersion: 5,
      },
    };

    const expectedResult = usingLegacy
      ? {
        code: '<div />',
        errors: [],
        options: {},
        parserOptions: {
          ecmaVersion: 5,
          ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
          },
        },
        settings: {},
      }
      : {
        code: '<div />',
        errors: [],
        options: {},
        languageOptions: {
          ecmaVersion: 5,
          parserOptions: {
            ecmaFeatures: {
              experimentalObjectRestSpread: true,
              jsx: true,
            },
          },
        },
        settings: {},
      };
    expect(parserOptionsMapper(testCase)).toEqual(expectedResult);
  });
});
