/* eslint-env jest */
import hasApplyText from '../../../src/util/hasApplyText';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

describe('hasApplyText', () => {
  describe('has no children and does not set dangerouslySetInnerHTML', () => {
    it('returns false', () => {
      expect(hasApplyText(JSXElementMock('div', []))).toBe(false);
    });
  });

  describe('has no children and sets dangerouslySetInnerHTML', () => {
    it('Returns true', () => {
      const prop = JSXAttributeMock('dangerouslySetInnerHTML', true);
      const element = JSXElementMock('div', [prop], []);
      expect(hasApplyText(element)).toBe(true);
    });
  });

  describe('has apply text as children', () => {
    it('Returns true for a Literal child, apply text', () => {
      const child = {
        type: 'Literal',
        value: 'apply',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(true); // we expect that when <div>apply</div> is found then error mesage should be sent to the developer
      // we expect that hasApplyText has <div>apply</div> and then the rule util hasApplyText and the rule divHasApply should send error message
    });

    it('Returns false for any other Literal child', () => {
      const child = {
        type: 'Literal',
        value: 'orange',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    //
    it('Returns true for visible child JSXElement', () => {
      const child = JSXElementMock('div', []);
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns true for JSXText Element', () => {
      const child = {
        type: 'JSXText',
        value: 'apply',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    // it('Returns false for hidden child JSXElement', () => {
    //   const ariaHiddenAttr = JSXAttributeMock('aria-hidden', true);
    //   const child = JSXElementMock('button', [ariaHiddenAttr]);
    //   const element = JSXElementMock('button', [], [child]);
    //   expect(hasApplyText(element)).toBe(false);
    // });

    it('Returns true for defined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'apply',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(true);
    });

    it('Returns false for undefined JSXExpressionContainer', () => {
      const expression = {
        type: 'Identifier',
        name: 'undefined',
      };
      const child = JSXExpressionContainerMock(expression);
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns false for unknown child type', () => {
      const child = {
        type: 'Unknown',
      };
      const element = JSXElementMock('div', [], [child]);
      expect(hasApplyText(element)).toBe(false);
    });

    it('Returns true with children passed as a prop', () => {
      const children = JSXAttributeMock('children', true);
      const element = JSXElementMock('div', [children], []);
      expect(hasApplyText(element)).toBe(true);
    });
  });
});
