/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typesToValidate = ['img'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'img' elements and custom types.
      if (typesToValidate.indexOf(nodeType) === -1) {
        return;
      }

      const roleProp = getProp(node.attributes, 'role');
      const roleValue = getPropValue(roleProp);
      const isPresentation = roleProp && typeof roleValue === 'string'
        && roleValue.toLowerCase() === 'presentation';

      if (isPresentation) {
        return;
      }

      const altProp = getProp(node.attributes, 'alt');

      // Missing alt prop error.
      if (altProp === undefined) {
        context.report({
          node,
          message: `${nodeType} elements must have an alt prop or use role="presentation".`,
        });
        return;
      }

      // Check if alt prop is undefined.
      const altValue = getPropValue(altProp);
      const isNullValued = altProp.value === null; // <img alt />

      if ((altValue && !isNullValued) || altValue === '') {
        return;
      }

      // Undefined alt prop error.
      context.report({
        node,
        message:
          `Invalid alt value for ${nodeType}. \
Use alt="" or role="presentation" for presentational images.`,
      });
    },
  }),
};
