/*
 * @flow
 */
export type ESLintReport = {
  node: any,
  message: string,
};

export type ESLintContext = {
  options: Array<Object>,
  report: (ESLintReport) => void,
};

export type ESLintConfig = {
  meta?: {[string]: mixed},
  create: (context: ESLintContext) => mixed,
}

export type ESLintVisitorSelectorConfig = {
  [string]: mixed,
};
