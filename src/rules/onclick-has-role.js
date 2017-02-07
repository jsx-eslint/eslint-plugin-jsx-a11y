/**
 * @fileoverview Enforce non-interactive elements with
 *  click handlers use role attribute.
 * @author Ethan Cohen
 */

import { dom } from 'aria-query';
import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import isPresentationRole from '../util/isPresentationRole';


// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Visible, non-interactive elements with click handlers must ' +
  'have role attribute.';

const schema = generateObjSchema();
const domElements = [...dom.keys()];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const attributes = node.attributes;
      if (getProp(attributes, 'onclick') === undefined) {
        return;
      }

      const type = elementType(node);
      const hasRole = getPropValue(getProp(attributes, 'role')) !== undefined;

      if (!domElements.includes(type)) {
        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        return;
      } else if (
        isHiddenFromScreenReader(type, attributes)
        || isPresentationRole(type, attributes)
      ) {
        // Presentation is an intentional signal from the author that this
        // element is not meant to be perceivable. For example, a click screen
        // to close a dialog .
        return;
      } else if (
        isInteractiveElement(type, attributes)
        || isInteractiveRole(type, attributes)
      ) {
        return;
      } else if (hasRole) {
        // The element has a value in a role attribute, but the literal value
        // cannot be determined, so we must assume it's valid.
        return;
      }

      // Visible, non-interactive elements require role attribute.
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
