/* eslint-env mocha */
import expect from 'expect';
import toAST from 'to-ast';
import isNonLiteralProperty from '../../../src/util/isNonLiteralProperty';
import IdentifierMock from '../../../__mocks__/IdentifierMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

const theProp = 'theProp';

describe('isNonLiteralProperty', () => {
  describe('elements without the property', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([], theProp)).toBe(false);
    });
  });
  describe('elements with a literal property', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, toAST('theRole'))], theProp)).toBe(false);
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
