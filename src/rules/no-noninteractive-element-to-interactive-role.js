/**
 * @fileoverview Disallow inherently non-interactive elements to be assigned
 * interactive roles.
 * @author Jesse Beach
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import {
  elementType,
  propName,
} from 'jsx-ast-utils';
import type { JSXIdentifier } from 'ast-types-flow';
import includes from 'array-includes';
import has from 'has';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import type { ESLintJSXAttribute } from '../../flow/eslint-jsx';
import getExplicitRole from '../util/getExplicitRole';
import isNonInteractiveElement from '../util/isNonInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';

const errorMessage = 'Non-interactive elements should not be assigned interactive roles.';

const domElements = [...dom.keys()];

module.exports = ({
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-noninteractive-element-to-interactive-role.md',
    },
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

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    return {
      JSXAttribute: (attribute: ESLintJSXAttribute) => {
        const attributeName: JSXIdentifier = propName(attribute);
        // $FlowFixMe: [TODO] Mark propName as a JSXIdentifier, not a string.
        if (attributeName !== 'role') {
          return;
        }
        const node = attribute.parent;
        const { attributes } = node;
        const type = elementType(node);
        const role = getExplicitRole(type, node.attributes);

        if (!includes(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        // Allow overrides from rule configuration for specific elements and
        // roles.
        const allowedRoles = (options[0] || {});
        if (has(allowedRoles, type) && includes(allowedRoles[type], role)) {
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
}: ESLintConfig);
