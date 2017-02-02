/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  elementType,
  getLiteralPropValue,
  getProp,
  hasAnyProp,
} from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isNonInteractiveElement from '../util/isNonInteractiveElement';

const errorMessage =
  'Visible, non-interactive elements should not have mouse or keyboard event listeners';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const props = node.attributes;
      const type = elementType(node);

      const interactiveProps = [
        'onclick',
        'ondblclick',
        'onkeydown',
        'onkeyup',
        'onkeypress',
      ];

      const hasInteractiveProps = hasAnyProp(props, interactiveProps);

      if (isHiddenFromScreenReader(type, props)) {
        return;
      } else if (
        ['presentation', 'none'].indexOf(
          getLiteralPropValue(getProp(props, 'role'))
        ) > -1
      ) {
        // Presentation is an intentional signal from the author that this
        // element is not meant to be perceivable. For example, a click screen
        // to close a dialog .
        return;
      } else if (isInteractiveElement(type, props)) {
        return;
      } else if (!hasInteractiveProps) {
        return;
      } else if (
        hasInteractiveProps
        && !isNonInteractiveElement(type, props)
      ) {
        return;
      }

      // Visible, non-interactive elements should not have an interactive handler.
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
