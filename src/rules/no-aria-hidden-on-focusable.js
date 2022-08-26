/**
 * @fileoverview Enforce aria-hidden is not used on interactive elements or contain interactive elements.
 * @author Kate Higa
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from 'jsx-ast-utils';
import getElementType from '../util/getElementType';
import isFocusable from '../util/isFocusable';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'aria-hidden="true" must not be set on focusable elements.';
const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-aria-hidden-on-focusable.md',
      description: errorMessage,
    },
    schema: [schema],
  },

  create(context) {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement(node) {
        const { attributes } = node;
        const type = elementType(node);
        const isAriaHidden = getPropValue(getProp(attributes, 'aria-hidden')) === true;

        if (isAriaHidden && isFocusable(type, attributes)) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      },
    };
  },
};
