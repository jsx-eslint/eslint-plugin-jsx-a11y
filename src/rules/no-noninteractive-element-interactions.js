/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Jese Beach
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
  propName,
} from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import includes from 'array-includes';
import has from 'has';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import { arraySchema, generateObjSchema } from '../util/schemas';
import isAbstractRole from '../util/isAbstractRole';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import isNonInteractiveElement from '../util/isNonInteractiveElement';
import isNonInteractiveRole from '../util/isNonInteractiveRole';
import isPresentationRole from '../util/isPresentationRole';

const errorMessage = 'Non-interactive elements should not be assigned mouse or keyboard event listeners.';

const domElements = [...dom.keys()];
const defaultInteractiveProps = [
  ...eventHandlersByType.focus,
  ...eventHandlersByType.image,
  ...eventHandlersByType.keyboard,
  ...eventHandlersByType.mouse,
];
const schema = generateObjSchema({
  handlers: arraySchema,
});

module.exports = ({
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-noninteractive-element-interactions.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        let { attributes } = node;
        const type = elementType(node);
        const config = (options[0] || {});
        const interactiveProps = config.handlers || defaultInteractiveProps;
        // Allow overrides from rule configuration for specific elements and roles.
        if (has(config, type)) {
          attributes = attributes.filter((attr) => attr.type !== 'JSXSpreadAttribute' && !includes(config[type], propName(attr)));
        }

        const hasInteractiveProps = interactiveProps
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
          || (
            !isNonInteractiveElement(type, attributes)
            && !isNonInteractiveRole(type, attributes)
          )
          || isAbstractRole(type, attributes)
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
    };
  },
}: ESLintConfig);
