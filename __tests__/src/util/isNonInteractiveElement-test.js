/* eslint-env mocha */
import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import isNonInteractiveElement from '../../../src/util/isNonInteractiveElement';
import {
  genIndeterminantInteractiveElements,
  genInteractiveElements,
  genNonInteractiveElements,
} from '../../../__mocks__/genInteractives';

const genElementSymbol = (openingElement) => {
  return openingElement.name.name + (
    (openingElement.attributes.length > 0)
      ? `${openingElement.attributes.map(
        attr => `[${attr.name.name}=\"${attr.value.value}\"]` ).join('')
      }`
      : ''
  );
};

describe('isNonInteractiveElement', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isNonInteractiveElement(undefined, []))
        .toBe(false);
    });
  });
  describe('non-interactive elements', () => {
    genNonInteractiveElements().forEach(
      ({ openingElement }) => {
        it(`should identify \`${genElementSymbol(openingElement)}\` as a non-interactive element`, () => {
          expect(isNonInteractiveElement(
            elementType(openingElement),
            openingElement.attributes,
          )).toBe(true);
        });
      },
    );
  });
  describe('interactive elements', () => {
    genInteractiveElements().forEach(
      ({ openingElement }) => {
        it(`should NOT identify \`${genElementSymbol(openingElement)}\` as a non-interactive element`, () => {
          expect(isNonInteractiveElement(
            elementType(openingElement),
            openingElement.attributes,
          )).toBe(false);
        });
      },
    );
  });
  describe('indeterminate elements', () => {
    genIndeterminantInteractiveElements().forEach(
      ({ openingElement }) => {
        it(`should NOT identify \`${openingElement.name.name}\` as a non-interactive element`, () => {
          expect(isNonInteractiveElement(
            elementType(openingElement),
            openingElement.attributes,
          )).toBe(false);
        });
      },
    );
  });
});
