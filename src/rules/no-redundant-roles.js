/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit/default role property on element.
 * @author Ethan Cohen <@evcohen>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
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

  create: context => ({
    JSXOpeningElement: (node) => {
      const type = elementType(node);
      const implicitRole = getImplicitRole(type, node.attributes);
      const explicitRole = getExplicitRole(type, node.attributes);

      if (!implicitRole || !explicitRole) {
        return;
      }

      if (implicitRole === explicitRole) {
        context.report({
          node,
          message: errorMessage(type, implicitRole.toLowerCase()),
        });
      }
    },
  }),
};
