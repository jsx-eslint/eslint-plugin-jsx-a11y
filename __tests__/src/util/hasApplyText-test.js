/* eslint-env jest */
import hasApplyText from '../../../src/util/hasApplyText';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

describe('hasApplyText', () => {
  describe('has no children and does not set dangerouslySetInnerHTML', () => {
    it('returns false', () => {
      expect(hasApplyText(JSXElementMock('button', []))).toBe(false);
    });
  });

  describe('has no children and sets dangerouslySetInnerHTML', () => {
    it('Returns true', () => {
      const prop = JSXAttributeMock('dangerouslySetInnerHTML', true);
      const element = JSXElementMock('button', [prop], []);
      expect(hasApplyText(element)).toBe(true);
    });
  });

  describe('has children', () => {
    it('Returns false for a Literal child', () => {
      const child = {
        type: 'Literal',
        value: 'apply',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns true for a Literal child', () => {
      const child = {
        type: 'Literal',
        value: 'apply',
      };
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns true for visible child JSXElement', () => {
      const child = JSXElementMock('button', []);
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns true for JSXText Element', () => {
      const child = {
        type: 'JSXText',
        value: 'apply',
      };
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns false for hidden child JSXElement', () => {
      const ariaHiddenAttr = JSXAttributeMock('aria-hidden', true);
      const child = JSXElementMock('button', [ariaHiddenAttr]);
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns true for defined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'apply',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns false for undefined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'undefined',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns false for unknown child type', () => {
      const child = {
        type: 'Unknown',
      };
      const element = JSXElementMock('button', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns true with children passed as a prop', () => {
      const children = JSXAttributeMock('children', true);
      const element = JSXElementMock('button', [children], []);
      expect(hasApplyText(element)).toBe(true);
    });
  });
});
