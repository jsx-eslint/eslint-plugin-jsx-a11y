/**
 * @fileoverview Enforce controls are associated with a text label.
 * @author Jesse Beach
 *
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getLiteralPropValue } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import includes from 'array-includes';
import { generateObjSchema, arraySchema } from '../util/schemas';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import isDOMElement from '../util/isDOMElement';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import mayHaveAccessibleLabel from '../util/mayHaveAccessibleLabel';

const errorMessage = 'A control must be associated with a text label.';

const ignoreList = ['link'];

const schema = generateObjSchema({
  labelAttributes: arraySchema,
  controlComponents: arraySchema,
  ignoreElements: arraySchema,
  ignoreRoles: arraySchema,
  depth: {
    description: 'JSX tree depth limit to check for accessible label',
    type: 'integer',
    minimum: 0,
  },
});

module.exports = ({
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const options = context.options[0] || {};
    const {
      labelAttributes = [],
      controlComponents = [],
      ignoreElements = [],
      ignoreRoles = [],
    } = options;

    const newIgnoreElements = new Set([...ignoreElements, ...ignoreList]);

    const rule = (node: JSXElement): void => {
      const tag = elementType(node.openingElement);
      const role = getLiteralPropValue(getProp(node.openingElement.attributes, 'role'));
      // Ignore interactive elements that might get their label from a source
      // that cannot be discerned from static analysis, like
      // <label><input />Save</label>
      if (newIgnoreElements.has(tag)) {
        return;
      }
      // Ignore roles that are "interactive" but should not require a label.
      if (includes(ignoreRoles, role)) {
        return;
      }
      const props = node.openingElement.attributes;
      const nodeIsDOMElement = isDOMElement(tag);
      const nodeIsHiddenFromScreenReader = isHiddenFromScreenReader(tag, props);
      const nodeIsInteractiveElement = isInteractiveElement(tag, props);
      const nodeIsInteractiveRole = isInteractiveRole(tag, props);
      const nodeIsControlComponent = controlComponents.indexOf(tag) > -1;

      if (nodeIsHiddenFromScreenReader) {
        return;
      }

      let hasAccessibleLabel = true;
      if (
        nodeIsInteractiveElement
        || (
          nodeIsDOMElement
          && nodeIsInteractiveRole
        )
        || nodeIsControlComponent

      ) {
        // Prevent crazy recursion.
        const recursionDepth = Math.min(
          options.depth === undefined ? 2 : options.depth,
          25,
        );
        hasAccessibleLabel = mayHaveAccessibleLabel(
          node,
          recursionDepth,
          labelAttributes,
        );
      }

      if (!hasAccessibleLabel) {
        context.report({
          node: node.openingElement,
          message: errorMessage,
        });
      }
    };

    // Create visitor selectors.
    return {
      JSXElement: rule,
    };
  },
}: ESLintConfig);
