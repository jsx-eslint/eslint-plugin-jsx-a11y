/**
 * @fileoverview Enforce static elements have no interactive handlers.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import {
  elementType,
  eventHandlersByType,
  getPropValue,
  getProp,
  hasProp,
} from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import includes from 'array-includes';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import { arraySchema, generateObjSchema } from '../util/schemas';
import isAbstractRole from '../util/isAbstractRole';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import isNonInteractiveElement from '../util/isNonInteractiveElement';
import isNonInteractiveRole from '../util/isNonInteractiveRole';
import isNonLiteralProperty from '../util/isNonLiteralProperty';
import isPresentationRole from '../util/isPresentationRole';

const errorMessage = 'Static HTML elements with event handlers require a role.';

const domElements = [...dom.keys()];
const defaultInteractiveProps = [
  ...eventHandlersByType.focus,
  ...eventHandlersByType.keyboard,
  ...eventHandlersByType.mouse,
];
const schema = generateObjSchema({
  handlers: arraySchema,
});

module.exports = ({
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const { attributes } = node;
        const type = elementType(node);
        const {
          allowExpressionValues,
          handlers = defaultInteractiveProps,
        } = (options[0] || {});

        const hasInteractiveProps = handlers
          .some((prop) => (
            hasProp(attributes, prop)
            && getPropValue(getProp(attributes, prop)) != null
          ));

        if (!includes(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        if (
          !hasInteractiveProps
          || isHiddenFromScreenReader(type, attributes)
          || isPresentationRole(type, attributes)
        ) {
          // Presentation is an intentional signal from the author that this
          // element is not meant to be perceivable. For example, a click screen
          // to close a dialog .
          return;
        }
        if (
          isInteractiveElement(type, attributes)
          || isInteractiveRole(type, attributes)
          || isNonInteractiveElement(type, attributes)
          || isNonInteractiveRole(type, attributes)
          || isAbstractRole(type, attributes)
        ) {
          // This rule has no opinion about abstract roles.
          return;
        }

        if (
          allowExpressionValues === true
          && isNonLiteralProperty(attributes, 'role')
        ) {
          // This rule has no opinion about non-literal roles.
          return;
        }

        // Visible, non-interactive elements should not have an interactive handler.
        context.report({
          node,
          message: errorMessage,
        });
      },
    };
  },
}: ESLintConfig);
