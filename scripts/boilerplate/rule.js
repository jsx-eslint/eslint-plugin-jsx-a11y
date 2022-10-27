const ruleBoilerplate = (author, description) => `/**
 * @fileoverview ${description}
 * @author ${author}
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '';

const schema = generateObjSchema(); // TODO: remove this and use "schema: []" if no options.

export default {
  meta: {
    docs: {
      get description() { throw new SyntaxError('do not forget to add the description!'); },
      get url() { throw new SyntaxError('do not forget to add the URL!'); },
    },
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
`;

module.exports = ruleBoilerplate;
