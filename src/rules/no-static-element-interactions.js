/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  dom,
} from 'aria-query';
import {
  elementType,
  getLiteralPropValue,
  getProp,
  hasAnyProp,
} from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import { generateObjSchema } from '../util/schemas';
import isAbstractRole from '../util/isAbstractRole';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isNonInteractiveElement from '../util/isNonInteractiveElement';

const errorMessage =
  'Visible, non-interactive elements should not have mouse or keyboard event listeners';

const schema = generateObjSchema();
const domElements = [...dom.keys()];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (
      node: JSXOpeningElement,
    ) => {
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

      if (!domElements.includes(type)) {
        // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.
        return;
      } else if (isHiddenFromScreenReader(type, props)) {
        return;
      } else if (!hasInteractiveProps) {
        return;
      } else if (
        ['presentation', 'none'].indexOf(
          getLiteralPropValue(getProp(props, 'role')),
        ) > -1
      ) {
        // Presentation is an intentional signal from the author that this
        // element is not meant to be perceivable. For example, a click screen
        // to close a dialog .
        return;
      } else if (
        isInteractiveElement(type, props)
        || isNonInteractiveElement(type, props)
        || isAbstractRole(type, props)
      ) {
        // This rule has no opinion about abtract roles.
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
