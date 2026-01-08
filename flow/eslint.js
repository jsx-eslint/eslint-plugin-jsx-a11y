/*
 * @flow
 */
import type { Node } from 'ast-types-flow';

export type ESLintReport = {
  node: any,
  message: string,
};

export type ESLintSettings = {
  [string]: mixed,
  'jsx-a11y'?: {
    components?: { [string]: string },
    attributes?: { for?: string[] },
    polymorphicPropName?: string,
    polymorphicAllowList?: Array<string>,
  },
}

export type ESLintContext = {
  options: Array<Object>,
  report: (ESLintReport) => void,
  settings: ESLintSettings,
  getAncestors?: () => Array<any>,
  sourceCode?: {
    getAncestors?: (node: Node) => Array<any>,
  }
};

export type ESLintConfig = {
  meta?: {[string]: mixed},
  create: (context: ESLintContext) => mixed,
}

export type ESLintVisitorSelectorConfig = {
  [string]: mixed,
};
