/**
 * @fileoverview Enforce controls are associated with a text label.
 * @author Jesse Beach
 *
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import includes from 'array-includes';
import { generateObjSchema, arraySchema } from '../util/schemas';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import getElementType from '../util/getElementType';
import isDOMElement from '../util/isDOMElement';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import isInteractiveRole from '../util/isInteractiveRole';
import mayHaveAccessibleLabel from '../util/mayHaveAccessibleLabel';

const errorMessage = 'A control must be associated with a text label.';

const ignoreList = ['link'];

function getJSXTreeRoot(node) {
  let root = node;
  // $FlowFixMe ESLint adds parent links that ast-types-flow does not describe.
  for (let { parent } = node; parent; parent = parent.parent) {
    if (/^(?:JSXAttribute|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration)$/.test(parent.type)) {
      break;
    }
    if (parent.type === 'JSXElement' || parent.type === 'JSXFragment') {
      root = parent;
    }
  }
  return root;
}

// Keep dynamic values unknown, and avoid coercing literal IDs such as "true" to booleans.
function getAssociationValue(attribute) {
  if (!attribute || !attribute.value) {
    return undefined;
  }
  const valueNode = attribute.value.expression || attribute.value;
  const value = valueNode.type === 'Literal' ? valueNode.value : getLiteralPropValue(attribute);
  if (value === null && valueNode.type !== 'Literal') {
    return null;
  }
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}

// null means an expression or custom component may contain the first control.
function getFirstLabelableElement(label, elementType) {
  const children = label.children.slice();
  while (children.length > 0) {
    const child = children.shift();
    if (child.type === 'JSXExpressionContainer') {
      return null;
    }
    if (child.type === 'JSXElement') {
      const tag = elementType(child.openingElement);
      if (tag === 'input') {
        if (child.openingElement.attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute')) {
          return null;
        }
        const typeProp = getProp(child.openingElement.attributes, 'type');
        const type = getLiteralPropValue(typeProp);
        if (typeof type !== 'string' || type.toLowerCase() !== 'hidden') {
          return typeProp && type === null ? null : child;
        }
      } else if (includes(['button', 'meter', 'output', 'progress', 'select', 'textarea'], tag)) {
        return child;
      } else if (!isDOMElement(tag)) {
        return null;
      }
    }
    // $FlowFixMe ast-types-flow does not describe JSXFragment.
    if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
      children.unshift(...child.children);
    }
  }
  return undefined;
}

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

export default ({
  meta: {
    docs: {
      description: 'Enforce that a control (an interactive element) has a text label.',
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const elementType = getElementType(context);
    const options = context.options[0] || {};
    const {
      labelAttributes = [],
      controlComponents = [],
      ignoreElements = [],
      ignoreRoles = [],
    } = options;

    const newIgnoreElements = new Set([].concat(ignoreElements, ignoreList));
    const labelsByTree = new Map();
    const selectsWithoutLabels = [];
    const htmlForAttributes = context.settings['jsx-a11y']?.attributes?.for ?? ['htmlFor'];
    const recursionDepth = Math.min(options.depth === undefined ? 2 : options.depth, 25);

    const hasAssociatedLabel = (node) => {
      const root = getJSXTreeRoot(node);
      const labels = labelsByTree.get(root) || [];
      return labels.some((label) => {
        if (!mayHaveAccessibleLabel(label, recursionDepth, labelAttributes, elementType, controlComponents)) {
          return false;
        }
        const htmlFor = htmlForAttributes
          .map((name) => getProp(label.openingElement.attributes, name))
          .find(Boolean);
        const id = getAssociationValue(getProp(node.openingElement.attributes, 'id'));
        const target = getAssociationValue(htmlFor);
        if (target !== undefined && target !== null) {
          if (id === undefined || id === '' || target === '') {
            return false;
          }
          return id === null || id === target;
        }
        if (target === null && id !== undefined && id !== '') {
          return true;
        }
        // $FlowFixMe ESLint adds parent links that ast-types-flow does not describe.
        for (let { parent } = node; parent; parent = parent.parent) {
          if (parent === label) {
            const firstControl = getFirstLabelableElement(label, elementType);
            return firstControl === null || firstControl === node;
          }
          if (parent === root) {
            break;
          }
        }
        return false;
      });
    };

    const rule = (node: JSXElement): void => {
      const tag = elementType(node.openingElement);
      const role = getLiteralPropValue(getProp(node.openingElement.attributes, 'role'));
      if (tag === 'label' && !isHiddenFromScreenReader(tag, node.openingElement.attributes)) {
        const root = getJSXTreeRoot(node);
        const labels = labelsByTree.get(root) || [];
        labels.push(node);
        labelsByTree.set(root, labels);
      }
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
        hasAccessibleLabel = mayHaveAccessibleLabel(
          node,
          recursionDepth,
          labelAttributes,
          elementType,
          controlComponents,
        );
      }

      if (!hasAccessibleLabel) {
        if (tag === 'select') {
          selectsWithoutLabels.push(node);
          return;
        }
        context.report({
          node: node.openingElement,
          message: errorMessage,
        });
      }
    };

    // Create visitor selectors.
    return {
      JSXElement: rule,
      'Program:exit': () => {
        selectsWithoutLabels.forEach((node) => {
          if (!hasAssociatedLabel(node)) {
            context.report({ node: node.openingElement, message: errorMessage });
          }
        });
      },
    };
  },
}: ESLintConfig);
