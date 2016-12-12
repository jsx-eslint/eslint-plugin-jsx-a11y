/* eslint-env mocha */
import assert from 'assert';
import { elementType } from 'jsx-ast-utils';
import isNonInteractiveRole from '../../../src/util/isNonInteractiveRole';
import {
  genInteractiveRoleElements,
  genNonInteractiveRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isNonInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should not identify them as non-interactive elements', () => {
      expect(isNonInteractiveRole(undefined, [])).toBe(false);
    });
  });
  describe('elements with an interactive role', () => {
    it('should not identify them as non-interactive elements', () => {
      genInteractiveRoleElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isNonInteractiveRole(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false)
      );
    });
  });
  describe('elements without a role', () => {
    it('should not identify them as non-interactive elements', () => {
      expect(isNonInteractiveRole('div', [])).toBe(false);
    });
  });
  describe('elements with a non-interactive role', () => {
    it('should identify them as non-interactive elements', () => {
      genNonInteractiveRoleElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isNonInteractiveRole(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(true)
      );
    });
  });
});
