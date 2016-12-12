/* eslint-env mocha */
import assert from 'assert';
import { elementType } from 'jsx-ast-utils';
import isInteractiveElement from '../../../src/util/isInteractiveElement';
import {
  genInteractiveElements,
  genNonInteractiveElements,
} from '../../../__mocks__/genInteractives';

describe('isInteractiveElement', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isInteractiveElement(undefined, []))
        .toBe(true);
    });
  });
  describe('non-interactive elements', () => {
    it('should not identify them as interactive elements', () => {
      genNonInteractiveElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(false)
      );
    });
  });
  describe('interactive elements', () => {
    it('should identify them as interactive elements', () => {
      genInteractiveElements().forEach(
        ({
          type,
          openingElement,
        }) => expect(isInteractiveElement(
          elementType(openingElement),
          openingElement.attributes,
        )).toBe(true)
      );
    });
  });
});
