import jsxAlly from '..';
import recommended from './recommended';

export default {
  ...recommended,
  rules: jsxAlly.configs.strict.rules,
};
