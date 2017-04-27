/**
 * @fileoverview Enforce heading (h1, h2, etc) elements contain accessible content.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import { getDOMElementFromCustomComponent, getCustomComponents } from '../util/settings/resolve';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage =
  'Headings must have content and the content must be accessible by a screen reader.';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const schema = generateObjSchema({ components: arraySchema });

const determineChildType = (context, child) => {
  switch (child.type) {
    case 'Literal':
      return Boolean(child.value);
    case 'JSXElement':
      return !isHiddenFromScreenReader(
        getDOMElementFromCustomComponent(context, elementType(child.openingElement)),
        child.openingElement.attributes,
      );
    case 'JSXExpressionContainer':
      if (child.expression.type === 'Identifier') {
        return child.expression.name !== 'undefined';
      }
      return true;
    default:
      return false;
  }
};

module.exports = {
  determineChildType,
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const customHeadingsMap = getCustomComponents(context, ...headings);
      const customHeadings = headings.map(header => customHeadingsMap[header]);
      const componentsOption = (context.options[0] && context.options[0].components) || [];
      // Set containing all DOM h* elements and custom components that map to header DOM elements.
      const typeCheck = new Set([].concat(...customHeadings, componentsOption));
      const nodeType = elementType(node);

      // Only check 'h*' elements and custom types.
      if (!typeCheck.has(nodeType)) {
        return;
      }

      const isAccessible =
        node.parent.children.some(determineChildType.bind(this, context)) ||
        hasAnyProp(node.attributes, ['dangerouslySetInnerHTML', 'children']);

      if (isAccessible) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
