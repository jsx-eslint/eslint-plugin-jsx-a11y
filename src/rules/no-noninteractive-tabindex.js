/**
 * @fileoverview Disallow tabindex on static and noninteractive elements
 * @author jessebeach
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import type { JSXOpeningElement } from 'ast-types-flow';
import {
  elementType,
  getProp,
  getLiteralPropValue,
} from 'jsx-ast-utils';
import includes from 'array-includes';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import isNonLiteralProperty from '../util/isNonLiteralProperty';
import { generateObjSchema, arraySchema } from '../util/schemas';
import getTabIndex from '../util/getTabIndex';

const errorMessage = '`tabIndex` should only be declared on interactive elements.';

const schema = generateObjSchema({
  roles: {
    ...arraySchema,
    description: 'An array of ARIA roles',
  },
  tags: {
    ...arraySchema,
    description: 'An array of HTML tag names',
  },
});

module.exports = ({
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-noninteractive-tabindex.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const type = elementType(node);
        const { attributes } = node;
        const tabIndexProp = getProp(attributes, 'tabIndex');
        const tabIndex = getTabIndex(tabIndexProp);
        // Early return;
        if (typeof tabIndex === 'undefined') {
          return;
        }
        const role = getLiteralPropValue(getProp(node.attributes, 'role'));

        if (!dom.has(type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        // Allow for configuration overrides.
        const {
          tags,
          roles,
          allowExpressionValues,
        } = (options[0] || {});
        if (tags && includes(tags, type)) {
          return;
        }
        if (roles && includes(roles, role)) {
          return;
        }
        if (
          allowExpressionValues === true
          && isNonLiteralProperty(attributes, 'role')
        ) {
          return;
        }
        if (
          isInteractiveElement(type, attributes)
          || isInteractiveRole(type, attributes)
        ) {
          return;
        }
        if (
          tabIndex >= 0
        ) {
          context.report({
            node: tabIndexProp,
            message: errorMessage,
          });
        }
      },
    };
  },
}: ESLintConfig);
