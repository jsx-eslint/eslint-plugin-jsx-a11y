import Literal from '../Literal';
import Identifier from '../Identifier';
import TemplateLiteral from './TemplateLiteral';
import ArrowFunctionExpression from './FunctionExpression';
import FunctionExpression from './FunctionExpression';
import LogicalExpression from './LogicalExpression';
import MemberExpression from './MemberExpression';
import CallExpression from './CallExpression';

const TYPES = {
  Identifier,
  Literal,
  TemplateLiteral,
  ArrowFunctionExpression,
  FunctionExpression,
  LogicalExpression,
  MemberExpression,
  CallExpression
};

const extract = value => {
  // Value will not have the expression property when we recurse.
  const expression = value.expression || value;

  return TYPES[expression.type](expression);
};

export default extract;
