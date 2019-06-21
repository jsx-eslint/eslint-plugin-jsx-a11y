/* eslint-disable no-underscore-dangle */
import { AbstractVirtualNode } from 'axe-core';

const defaultProps = {
  nodeType: 1,
  nodeName: 'div',
};

export default class JSXVirtualNode extends AbstractVirtualNode {
  constructor({
    props = {},
    attrs = [],
  } = {}) {
    super();
    this._attrs = [...attrs];
    this._props = {
      ...defaultProps,
      ...props,
    };
  }

  get props() {
    return this._props;
  }

  attr(attrName) {
    const jsxAttr = this._attrs.find(({ name }) => name.name === attrName);
    return (jsxAttr && jsxAttr.value && jsxAttr.value.value
      ? jsxAttr.value.value
      : null
    );
  }

  hasAttr(attrName) {
    return this._attrs.some(({ name }) => name.name === attrName);
  }

  static fromJSXOpeningElement(jsxNode) {
    const { name = {}, attributes } = jsxNode;
    return new JSXVirtualNode({
      props: { nodeName: name.name || undefined },
      attrs: attributes,
    });
  }
}
