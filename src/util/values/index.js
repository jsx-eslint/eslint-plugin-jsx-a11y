import Literal from './Literal';
import Identifier from './Identifier';
import JSXElement from './JSXElement';
import JSXExpressionContainer from './expressions';

const TYPES = {
  Literal,
  Identifier,
  JSXElement,
  JSXExpressionContainer
};

const getValue = value => TYPES[value.type](value);

export default getValue;
