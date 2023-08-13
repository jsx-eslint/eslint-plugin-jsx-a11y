/**
 * @fileoverview Disallow inherently interactive elements to be assigned
 * non-interactive roles.
 * @author Jesse Beach
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import {
  getProp,
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';
import type { JSXIdentifier } from 'ast-types-flow';
import includes from 'array-includes';
import hasOwn from 'hasown';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import type { ESLintJSXAttribute } from '../../flow/eslint-jsx';
import getElementType from '../util/getElementType';
import isInteractiveElement from '../util/isInteractiveElement';
import isNonInteractiveRole from '../util/isNonInteractiveRole';
import isPresentationRole from '../util/isPresentationRole';

const errorMessage = 'Interactive elements should not be assigned non-interactive roles.';

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md',
      description: 'Interactive elements should not be assigned non-interactive roles.',
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
    const elementType = getElementType(context);
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
        const role = getLiteralPropValue(getProp(node.attributes, 'role'));

        if (!dom.has(type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        // Allow overrides from rule configuration for specific elements and
        // roles.
        const allowedRoles = (options[0] || {});
        if (hasOwn(allowedRoles, type) && includes(allowedRoles[type], role)) {
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
            node: attribute,
            message: errorMessage,
          });
        }
      },
    };
  },
}: ESLintConfig);
