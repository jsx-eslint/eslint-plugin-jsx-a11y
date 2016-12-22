/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author Jesse Beach <@jessebeach>
 */

import { getProp, elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import DOMElements from '../util/attributes/DOM.json';
import getTabIndex from '../util/getTabIndex';
import isInteractiveElement from '../util/isInteractiveElement';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'An element that manages focus with `aria-activedescendant` must be tabbable';

const schema = generateObjSchema();

const DOMElementKeys = Object.keys(DOMElements);

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const { attributes } = node;

      if (getProp(attributes, 'aria-activedescendant') === undefined) {
        return;
      }

      const type = elementType(node);
      const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));

      // Do not test higher level JSX components, as we do not know what
      // low-level DOM element this maps to.
      if (DOMElementKeys.indexOf(type) === -1) {
        return;
      }

      if (
        isInteractiveElement(type, attributes)
        && (
          tabIndex === undefined
          || tabIndex >= 0
        )
      ) {
        return;
      }

      if (getTabIndex(getProp(attributes, 'tabIndex')) >= 0) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
