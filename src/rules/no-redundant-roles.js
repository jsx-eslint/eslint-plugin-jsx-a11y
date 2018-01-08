/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit/default role property on element.
 * @author Ethan Cohen <@evcohen>
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import includes from 'array-includes';
import has from 'has';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import getExplicitRole from '../util/getExplicitRole';
import getImplicitRole from '../util/getImplicitRole';

const errorMessage = (element, implicitRole) =>
  `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`;

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-redundant-roles.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext) => {
    const { options } = context;
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const type = elementType(node);
        const implicitRole = getImplicitRole(type, node.attributes);
        const explicitRole = getExplicitRole(type, node.attributes);

        if (!implicitRole || !explicitRole) {
          return;
        }

        if (implicitRole === explicitRole) {
          const allowedRoles = (options[0] || {});
          if (has(allowedRoles, type) && includes(allowedRoles[type], implicitRole)) {
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
};
