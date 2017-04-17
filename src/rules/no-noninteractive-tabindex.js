/**
 * @fileoverview Disallow tabindex on static and noninteractive elements
 * @author jessebeach
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
  getProp,
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import { generateObjSchema } from '../util/schemas';

const errorMessage =
  '`tabIndex` should only be declared on interactive elements.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (
        attribute: ESLintJSXAttribute,
      ) => {
      const attributeName = propName(attribute);
      if (attributeName !== 'tabIndex') {
        return;
      }
      const node = attribute.parent;
      const attributes = node.attributes;
      const type = elementType(node);
      const tabIndex = getLiteralPropValue(
          getProp(node.attributes, 'tabIndex'),
        );

      if (!dom.has(type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
        return;
      }
      if (
        isInteractiveElement(type, attributes)
        || isInteractiveRole(type, attributes)
      ) {
        return;
      }
      if (
          !isNaN(Number.parseInt(tabIndex, 10))
          && tabIndex >= 0
        ) {
        context.report({
          node: attribute,
          message: errorMessage,
        });
      }
    },
  }),
};
