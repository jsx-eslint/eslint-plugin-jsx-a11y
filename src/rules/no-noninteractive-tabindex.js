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

  create: (context: ESLintContext) => {
    const options = context.options;
    return {
      JSXOpeningElement: (
          node: JSXOpeningElement,
        ) => {
        const type = elementType(node);
        const attributes = node.attributes;
        const tabIndexProp = getProp(attributes, 'tabIndex');
        const tabIndex = getLiteralPropValue(tabIndexProp);
        // Early return;
        if (typeof tabIndex === 'undefined') {
          return;
        }
        const role = getLiteralPropValue(
          getProp(node.attributes, 'role'),
        );


        if (!dom.has(type)) {
            // Do not test higher level JSX components, as we do not know what
            // low-level DOM element this maps to.
          return;
        }
        // Allow for configuration overrides.
        const {
          tags,
          roles,
        } = (options[0] || {});
        if (
          (tags && tags.includes(type))
          || (roles && roles.includes(role))
        ) {
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
            node: tabIndexProp,
            message: errorMessage,
          });
        }
      },
    };
  },
};
