'use strict';

import assign from 'object-assign';
import Literal from '../Literal';
import Identifier from './Identifier';
import TemplateLiteral from './TemplateLiteral';
import ArrowFunctionExpression from './FunctionExpression';
import FunctionExpression from './FunctionExpression';
import LogicalExpression from './LogicalExpression';
import MemberExpression from './MemberExpression';
import CallExpression from './CallExpression';
import UnaryExpression from './UnaryExpression';
import ThisExpression from './ThisExpression';
import ConditionalExpression from './ConditionalExpression';



// Composition map of types to their extractor functions.
const TYPES = {
  Identifier,
  Literal,
  TemplateLiteral,
  ArrowFunctionExpression,
  FunctionExpression,
  LogicalExpression,
  MemberExpression,
  CallExpression,
  UnaryExpression,
  ThisExpression,
  ConditionalExpression
};

const noop = () => null;

// Composition map of types to their extractor functions to handle literals.
const LITERAL_TYPES = assign({}, TYPES, {
  Literal: value => {
    const extractedVal = TYPES.Literal(value);
    const isNull = extractedVal === null;
    // This will be convention for attributes that have null
    // value explicitly defined (<div prop={null} /> maps to 'null').
    return isNull ? 'null' : extractedVal;
  },
  Identifier: value => {
    const isUndefined = TYPES.Identifier(value) === undefined;
    return isUndefined ? undefined : null;
  },
  ArrowFunctionExpression: noop,
  FunctionExpression: noop,
  LogicalExpression: noop,
  MemberExpression: noop,
  CallExpression: noop,
  UnaryExpression: value => {
    const extractedVal = TYPES.UnaryExpression(value);
    return extractedVal === undefined ? null : extractedVal;
  },
  ThisExpression: noop,
  ConditionalExpression: noop
});

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *all* possible expression types.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
export default function extract(value) {
  // Value will not have the expression property when we recurse.
  const expression = value.expression || value;

  return TYPES[expression.type](expression);
}

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *some* possible types that map to literals.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
export function extractLiteral(value) {
  const expression = value.expression || value;

  return LITERAL_TYPES[expression.type](expression);
}
