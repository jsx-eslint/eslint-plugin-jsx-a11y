/* eslint-env mocha */
import assert from 'assert';
import { elementType } from 'jsx-ast-utils';
import isInteractiveRole from '../../../src/util/isInteractiveRole';
import {
  genInteractiveRoleElements,
  genNonInteractiveRoleElements,
} from '../../../__mocks__/genInteractives';

describe('isInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive role elements', () => {
      expect(isInteractiveRole(undefined, []))
        .toBe(true);
    });
  });
  describe('elements with a non-interactive role', () => {
    it('should not identify them as interactive role elements', () => {
      genNonInteractiveRoleElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isInteractiveRole(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false)
      );
    });
  });
  describe('elements without a role', () => {
    it('should not identify them as interactive role elements', () => {
      expect(isInteractiveRole('div', [])).toBe(false);
    });
  });
  describe('elements with an interactive role', () => {
    it('should identify them as interactive role elements', () => {
      genInteractiveRoleElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isInteractiveRole(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(true)
      );
    });
  });
});
