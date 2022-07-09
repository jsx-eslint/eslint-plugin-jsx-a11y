import expect from 'expect';
import { elementType } from 'jsx-ast-utils';
import getAccessibleChildText from '../../../src/util/getAccessibleChildText';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXElementMock from '../../../__mocks__/JSXElementMock';

describe('getAccessibleChildText', () => {
  it('returns the aria-label when present', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [JSXAttributeMock('aria-label', 'foo')],
    ), elementType)).toBe('foo');
  });

  it('returns the aria-label instead of children', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [JSXAttributeMock('aria-label', 'foo')],
      [{ type: 'JSXText', value: 'bar' }],
    ), elementType)).toBe('foo');
  });

  it('skips elements with aria-hidden=true', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [JSXAttributeMock('aria-hidden', 'true')],
    ), elementType)).toBe('');
  });

  it('returns literal value for JSXText child', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [{ type: 'JSXText', value: 'bar' }],
    ), elementType)).toBe('bar');
  });

  it('returns literal value for JSXText child', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [{ type: 'Literal', value: 'bar' }],
    ), elementType)).toBe('bar');
  });

  it('returns recursive value for JSXElement child', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [JSXElementMock(
        'span',
        [],
        [{ type: 'Literal', value: 'bar' }],
      )],
    ), elementType)).toBe('bar');
  });

  it('skips children with aria-hidden-true', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [JSXElementMock(
        'span',
        [],
        [JSXElementMock(
          'span',
          [JSXAttributeMock('aria-hidden', 'true')],
        )],
      )],
    ), elementType)).toBe('');
  });

  it('joins multiple children properly - no spacing', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [{ type: 'Literal', value: 'foo' }, { type: 'Literal', value: 'bar' }],
    ), elementType)).toBe('foo bar');
  });

  it('joins multiple children properly - with spacing', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [{ type: 'Literal', value: ' foo ' }, { type: 'Literal', value: ' bar ' }],
    ), elementType)).toBe('foo bar');
  });

  it('skips unknown elements', () => {
    expect(getAccessibleChildText(JSXElementMock(
      'a',
      [],
      [{ type: 'Literal', value: 'foo' }, { type: 'Unknown' }, { type: 'Literal', value: 'bar' }],
    ), elementType)).toBe('foo bar');
  });
});
