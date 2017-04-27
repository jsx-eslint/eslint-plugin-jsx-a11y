/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import { arraySchema, generateObjSchema } from '../util/schemas';
import { getCustomComponents, getDOMElementFromCustomComponent } from '../util/settings/resolve';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';

const errorMessage =
  'Anchors must have content and the content must be accessible by a screen reader.';

const schema = generateObjSchema({ a: arraySchema });

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
      const { a: typeCheck } = getCustomComponents(context, 'a');
      const nodeType = elementType(node);

      // Only check anchor elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
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
