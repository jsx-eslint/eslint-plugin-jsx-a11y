type ESLintReport = {
  node: any,
  message: string,
};

type ESLintContext = {
  options: Array<Object>,
  report: (ESLintReport) => void,
};
