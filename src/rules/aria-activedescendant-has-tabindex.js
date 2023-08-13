/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author Jesse Beach <@jessebeach>
 */

import { dom } from 'aria-query';
import { getProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import getElementType from '../util/getElementType';
import getTabIndex from '../util/getTabIndex';
import isInteractiveElement from '../util/isInteractiveElement';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'An element that manages focus with `aria-activedescendant` must have a tabindex';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-activedescendant-has-tabindex.md',
      description: 'Enforce elements with aria-activedescendant are tabbable.',
    },
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const { attributes } = node;

        if (getProp(attributes, 'aria-activedescendant') === undefined) {
          return;
        }

        const type = elementType(node);
        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        if (!dom.has(type)) {
          return;
        }
        const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));

        // If this is an interactive element and the tabindex attribute is not specified,
        // or the tabIndex property was not mutated, then the tabIndex
        // property will be undefined.
        if (
          isInteractiveElement(type, attributes)
          && tabIndex === undefined
        ) {
          return;
        }

        if (tabIndex >= -1) {
          return;
        }

        context.report({
          node,
          message: errorMessage,
        });
      },
    };
  },
};
