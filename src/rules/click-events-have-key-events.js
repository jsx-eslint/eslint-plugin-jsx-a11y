/**
 * @fileoverview Enforce a clickable non-interactive element has at least 1 keyboard event listener.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import { getProp, hasAnyProp, elementType } from 'jsx-ast-utils';
import includes from 'array-includes';
import { generateObjSchema } from '../util/schemas';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isPresentationRole from '../util/isPresentationRole';

const errorMessage = 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.';

const schema = generateObjSchema();
const domElements = [...dom.keys()];

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/click-events-have-key-events.md',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const props = node.attributes;
      if (getProp(props, 'onclick') === undefined) {
        return;
      }

      const type = elementType(node);
      const requiredProps = ['onkeydown', 'onkeyup', 'onkeypress'];

      if (!includes(domElements, type)) {
        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        return;
      }
      if (
        isHiddenFromScreenReader(type, props)
        || isPresentationRole(type, props)
      ) {
        return;
      }
      if (isInteractiveElement(type, props)) {
        return;
      }
      if (hasAnyProp(props, requiredProps)) {
        return;
      }

      // Visible, non-interactive elements with click handlers require one keyboard event listener.
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
