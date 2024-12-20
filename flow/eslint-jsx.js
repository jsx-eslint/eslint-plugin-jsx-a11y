/*
 * @flow
 */
import type {
  JSXAttribute,
  JSXElement,
  JSXOpeningElement,
} from 'ast-types-flow';

export type ESLintJSXAttribute = {
  parent: JSXOpeningElement
} & JSXAttribute;

type JSXOpeningFragment = {
  type: 'JSXOpeningFragment',
};

type JSXClosingFragment = {
  type: 'JSXClosingFragment',
};

export type JSXFragment = JSXElement & {
  type: 'JSXFragment',
  openingFragment: JSXOpeningFragment,
  closingFragment: JSXClosingFragment,
};
