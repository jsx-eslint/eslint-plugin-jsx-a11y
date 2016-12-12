/* eslint-env mocha */
import assert from 'assert';
import { elementType } from 'jsx-ast-utils';
import isNonInteractiveElement from '../../../src/util/isNonInteractiveElement';
import {
  genInteractiveElements,
  genNonInteractiveElements,
} from '../../../__mocks__/genInteractives';

describe('isNonInteractiveElement', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isNonInteractiveElement(undefined, []))
        .toBe(false);
    });
  });
  describe('non-interactive elements', () => {
    it('should not identify them as interactive elements', () => {
      genNonInteractiveElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isNonInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(true)
      );
    });
  });
  describe('interactive elements', () => {
    it('should identify them as interactive elements', () => {
      genInteractiveElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isNonInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false)
      );
    });
  });
});
