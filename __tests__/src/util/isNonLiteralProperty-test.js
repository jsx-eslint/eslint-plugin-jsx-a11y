/* eslint-env mocha */
import expect from 'expect';
import isNonLiteralProperty from '../../../src/util/isNonLiteralProperty';
import IdentifierMock from '../../../__mocks__/IdentifierMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXTextMock from '../../../__mocks__/JSXTextMock';
import LiteralMock from '../../../__mocks__/LiteralMock';

const theProp = 'theProp';

describe('isNonLiteralProperty', () => {
  describe('elements without the property', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([], theProp)).toBe(false);
    });
  });
  describe('elements with a literal property', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, LiteralMock('theRole'))], theProp)).toBe(false);
    });
  });
  describe('elements with a JSXText property', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, JSXTextMock('theRole'))], theProp)).toBe(false);
    });
  });
  describe('elements with a property of undefined', () => {
    it('should not identify them as non-literal role elements', () => {
      const undefinedExpression = IdentifierMock('undefined');
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, undefinedExpression)], theProp)).toBe(false);
    });
  });
  describe('elements with a expression property', () => {
    it('should identify them as non-literal role elements', () => {
      const identifierExpression = IdentifierMock('theIdentifier');
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, identifierExpression)], theProp)).toBe(true);
    });
  });
});
