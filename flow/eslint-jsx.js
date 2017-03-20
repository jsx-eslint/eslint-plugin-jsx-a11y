import type {
  JSXAttribute,
  JSXOpeningElement,
 } from 'ast-types-flow';

type ESLintJSXAttribute = {
  parent: JSXOpeningElement
} & JSXAttribute;
