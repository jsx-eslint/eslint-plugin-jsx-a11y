/* eslint-env mocha */
import expect from 'expect';
import { AbstractVirtualNode } from 'axe-core';
import JSXVirtualNode from '../../../src/util/JSXVirtualNode';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import IdentifierMock from '../../../__mocks__/IdentifierMock';

describe('JSXVirtualNode', () => {
  it('extends AbstractVirtualNode', () => {
    expect(new JSXVirtualNode()).toBeInstanceOf(AbstractVirtualNode);
  });

  it('sets default props when no props are provided', () => {
    const { props } = new JSXVirtualNode();
    expect(props).toHaveProperty('nodeType', 1);
    expect(props).toHaveProperty('nodeName', 'div');
  });

  it('sets props not part of the default', () => {
    const { props } = new JSXVirtualNode({
      props: {
        nodeName: 'span',
        foo: 'bar',
      },
    });
    expect(props).toHaveProperty('nodeType', 1); // default
    expect(props).toHaveProperty('nodeName', 'span');
    expect(props).toHaveProperty('foo', 'bar');
  });

  describe('.attr()', () => {
    it('returns null when the attribute does not exist', () => {
      const vNode = new JSXVirtualNode();
      expect(vNode.attr('id')).toBeNull();
    });

    it('returns the attribute value when set', () => {
      const idAttr = JSXAttributeMock('id', 'foo');
      const vNode = new JSXVirtualNode({
        attrs: [idAttr],
      });
      expect(vNode.attr('id')).toBe('foo');
    });

    it('returns null when the attribute value is not a literal', () => {
      const identifierExpression = IdentifierMock('theIdentifier');
      const idAttr = JSXAttributeMock('id', identifierExpression);
      const vNode = new JSXVirtualNode({
        attrs: [idAttr],
      });
      expect(vNode.attr('id')).toBeNull();
    });
  });

  describe('.hasAttr()', () => {
    it('returns false when the attribute does not exist', () => {
      const vNode = new JSXVirtualNode();
      expect(vNode.hasAttr('id')).toBe(false);
    });

    it('returns true attribute value when set', () => {
      const idAttr = JSXAttributeMock('id', 'foo');
      const vNode = new JSXVirtualNode({
        attrs: [idAttr],
      });
      expect(vNode.hasAttr('id')).toBe(true);
    });

    it('returns true when the attribute has no value', () => {
      const idAttr = JSXAttributeMock('id');
      const vNode = new JSXVirtualNode({
        attrs: [idAttr],
      });
      expect(vNode.hasAttr('id')).toBe(true);
    });

    it('returns true when the attribute value is not a literal', () => {
      const identifierExpression = IdentifierMock('theIdentifier');
      const idAttr = JSXAttributeMock('id', identifierExpression);
      const vNode = new JSXVirtualNode({
        attrs: [idAttr],
      });
      expect(vNode.hasAttr('id')).toBe(true);
    });
  });

  describe('::fromJSXOpeningElement()', () => {
    it('creates a virtual node', () => {
      const { openingElement } = JSXElementMock('div');
      const vNode = JSXVirtualNode.fromJSXOpeningElement(openingElement);
      expect(vNode).toBeInstanceOf(AbstractVirtualNode);
    });

    it('sets the correct props', () => {
      const { openingElement } = JSXElementMock('span');
      const { props } = JSXVirtualNode.fromJSXOpeningElement(openingElement);
      expect(props).toHaveProperty('nodeType', 1);
      expect(props).toHaveProperty('nodeName', 'span');
    });

    it('sets the correct attribute', () => {
      const { openingElement } = JSXElementMock('input', [
        JSXAttributeMock('id', 'foo'),
        JSXAttributeMock('type', 'text'),
      ]);
      const vNode = JSXVirtualNode.fromJSXOpeningElement(openingElement);
      expect(vNode.attr('id')).toBe('foo');
      expect(vNode.attr('type')).toBe('text');
    });
  });
});
