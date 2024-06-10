/**
 * @fileoverview Disallow duplicate ids.
 * @author Chris Ng
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-duplicate-ids.md',
      description: 'Disallow duplicate ids.',
    },
    schema: [schema],
  },

  create(context) {
    const idsUsedSet = new Set();
    const jsxExperissionIDsUsedSet = new Set();

    return {
      JSXOpeningElement(node) {
        const { attributes } = node;
        const idProp = getProp(attributes, 'id');
        const idValue = getPropValue(idProp);

        // Special case if id is assigned using JSXExpressionContainer
        if (idProp && idProp.type === 'JSXAttribute' && idProp.value.type === 'JSXExpressionContainer') {
          if (jsxExperissionIDsUsedSet.has(idValue)) {
            context.report({
              node,
              message: `Duplicate ID "${idValue}" found. ID attribute JSX experssions must be unique.`,
            });
          } else {
            jsxExperissionIDsUsedSet.add(idValue);
          }
        } else if (idsUsedSet.has(idValue)) {
          context.report({
            node,
            message: `Duplicate ID "${idValue}" found. ID attribute values must be unique.`,
          });
        } else {
          idsUsedSet.add(idValue);
        }
      },
    };
  },
};
