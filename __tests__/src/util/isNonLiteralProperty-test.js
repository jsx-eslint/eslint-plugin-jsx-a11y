/* eslint-env mocha */
import expect from 'expect';
import toAST from 'to-ast';
import isNonLiteralProperty from '../../../src/util/isNonLiteralProperty';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

const theProp = 'theProp';

describe('isNonLiteralRole', () => {
  describe('elements without a role', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([], theProp)).toBe(false);
    });
  });
  describe('elements with a literal role', () => {
    it('should not identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, toAST('theRole'))], theProp)).toBe(false);
    });
  });
  describe('elements with a expression role', () => {
    it('should identify them as non-literal role elements', () => {
      expect(isNonLiteralProperty([JSXAttributeMock(theProp, JSXExpressionContainerMock('expr'))], theProp)).toBe(true);
    });
  });
});
