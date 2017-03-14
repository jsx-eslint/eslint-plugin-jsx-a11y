/**
 * @fileoverview Disallow inherently interactive elements to be assigned
 * non-interactive roles.
 * @author Jesse Beach
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  dom,
} from 'aria-query';
import {
  elementType,
} from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema } from '../util/schemas';
import isInteractiveElement from '../util/isInteractiveElement';
import isNonInteractiveRole from '../util/isNonInteractiveRole';
import isPresentationRole from '../util/isPresentationRole';

const errorMessage =
  'Interactive elements should not be assigned non-interactive roles';

const schema = generateObjSchema();

const domElements = [...dom.keys()];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (
      node: JSXOpeningElement,
    ) => {
      const attributes = node.attributes;
      const type = elementType(node);

      if (!domElements.includes(type)) {
        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        return;
      }
      if (
        isInteractiveElement(type, attributes)
        && (
          isNonInteractiveRole(type, attributes)
          || isPresentationRole(type, attributes)
        )
      ) {
        // Visible, non-interactive elements should not have an interactive handler.
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
