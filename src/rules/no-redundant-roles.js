/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit/default role property on element.
 * @author Ethan Cohen <@evcohen>
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import includes from 'array-includes';
import hasOwn from 'hasown';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import getElementType from '../util/getElementType';
import getExplicitRole from '../util/getExplicitRole';
import getImplicitRole from '../util/getImplicitRole';

const errorMessage = (element, implicitRole) => (
  `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`
);

const DEFAULT_ROLE_EXCEPTIONS = { nav: ['navigation'] };

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-redundant-roles.md',
      description: 'Enforce explicit role property is not the same as implicit/default role property on element.',
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
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const type = elementType(node);
        const implicitRole = getImplicitRole(type, node.attributes);
        const explicitRole = getExplicitRole(type, node.attributes);

        if (!implicitRole || !explicitRole) {
          return;
        }

        if (implicitRole === explicitRole) {
          const allowedRedundantRoles = (options[0] || {});
          let redundantRolesForElement;

          if (hasOwn(allowedRedundantRoles, type)) {
            redundantRolesForElement = allowedRedundantRoles[type];
          } else {
            redundantRolesForElement = DEFAULT_ROLE_EXCEPTIONS[type] || [];
          }

          if (includes(redundantRolesForElement, implicitRole)) {
            return;
          }

          context.report({
            node,
            message: errorMessage(type, implicitRole.toLowerCase()),
          });
        }
      },
    };
  },
}: ESLintConfig);
