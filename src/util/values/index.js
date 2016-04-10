import Literal from './Literal';
import JSXElement from './JSXElement';
import JSXExpressionContainer from './expressions';
import { extractLiteral } from './expressions';

const TYPES = {
  Literal,
  JSXElement,
  JSXExpressionContainer
};

const LITERAL_TYPES = Object.assign({}, TYPES, {
  JSXElement: () => null,
  JSXExpressionContainer: extractLiteral
});

export const getValue = value => TYPES[value.type](value);

export const getLiteralValue = value => LITERAL_TYPES[value.type](value);

export default getValue;
