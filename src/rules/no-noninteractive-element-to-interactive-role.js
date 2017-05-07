/**
 * @fileoverview Disallow inherently non-interactive elements to be assigned
 * interactive roles.
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
  getProp,
  getLiteralPropValue,
} from 'jsx-ast-utils';
import type {
  JSXIdentifier,
} from 'ast-types-flow';
import includes from 'array-includes';
import isNonInteractiveElement from '../util/isNonInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';

const errorMessage =
  'Non-interactive elements should not be assigned interactive roles.';

const domElements = [...dom.keys()];

module.exports = {
  meta: {
    docs: {},
    schema: [{
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    }],
  },

  create: (context: ESLintContext) => {
    const options = context.options;
    return {
      JSXAttribute: (
        attribute: ESLintJSXAttribute,
      ) => {
        const attributeName: JSXIdentifier = attribute.name.name;
        if (attributeName !== 'role') {
          return;
        }
        const node = attribute.parent;
        const attributes = node.attributes;
        const type = elementType(node);
        const role = getLiteralPropValue(getProp(node.attributes, 'role'));

        if (!includes(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        // Allow overrides from rule configuration for specific elements and
        // roles.
        const allowedRoles = (options[0] || {});
        if (
          Object.prototype.hasOwnProperty.call(allowedRoles, type)
          && includes(allowedRoles[type], role)
        ) {
          return;
        }
        if (
          isNonInteractiveElement(type, attributes)
          && isInteractiveRole(type, attributes)
        ) {
          context.report({
            node: attribute,
            message: errorMessage,
          });
        }
      },
    };
  },
};
