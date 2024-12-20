/**
 * @fileoverview Enforce label tags have an associated control.
 * @author Jesse Beach
 *
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { hasProp, getProp, getPropValue } from 'jsx-ast-utils';
import type { JSXElement, JSXOpeningElement } from 'ast-types-flow';
import minimatch from 'minimatch';
import { generateObjSchema, arraySchema } from '../util/schemas';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import getChildComponent from '../util/getChildComponent';
import getElementType from '../util/getElementType';
import getParentElement from '../util/getParentElement';
import mayContainChildComponent from '../util/mayContainChildComponent';
import mayHaveAccessibleLabel from '../util/mayHaveAccessibleLabel';

const errorMessages = {
  accessibleLabel: 'A form label must have accessible text.',
  htmlFor: 'A form label must have a valid htmlFor attribute.',
  nesting: 'A form label must have an associated control as a descendant.',
  either: 'A form label must either have a valid htmlFor attribute or a control as a descendant.',
  both: 'A form label must have a valid htmlFor attribute and a control as a descendant.',
  htmlForShouldMatchId: 'A form label must have a htmlFor attribute that matches the id of the associated control.',
};

const schema = generateObjSchema({
  labelComponents: arraySchema,
  labelAttributes: arraySchema,
  controlComponents: arraySchema,
  assert: {
    description: 'Assert that the label has htmlFor, a nested label, both or either',
    type: 'string',
    enum: ['htmlFor', 'nesting', 'both', 'either'],
  },
  depth: {
    description: 'JSX tree depth limit to check for accessible label',
    type: 'integer',
    minimum: 0,
  },
  shouldHtmlForMatchId: {
    description: 'If true, the htmlFor prop of the label must match the id of the associated control',
    type: 'boolean',
  },
});

/**
 * Given a label node, validate that the htmlFor prop matches the id of a child
 * component in our list of possible control components.
 * @param node - Label node
 * @param controlComponents - List of control components
 */
const validateChildHasMatchingId = (
  node: JSXElement,
  controlComponents: string[],
  recursionDepth: number,
  elementTypeFn: (node: JSXOpeningElement) => string,
) => {
  const htmlForAttr = getProp(node.openingElement.attributes, 'htmlFor');
  const htmlForValue = getPropValue(htmlForAttr);

  const eligibleChildren = controlComponents.map((name) => getChildComponent(node, name, recursionDepth, elementTypeFn));

  const matchingChild = eligibleChildren?.find((child) => {
    if (!child) {
      return false;
    }

    // If this is an expression container, we can't validate the id.
    // So we'll assume it's valid.
    if (child.type === 'JSXExpressionContainer') {
      return true;
    }

    const childIdAttr = getProp(child.openingElement.attributes, 'id');
    const childIdValue = getPropValue(childIdAttr);

    return htmlForValue === childIdValue;
  });
  return !!matchingChild;
};

/**
 * Given a label node, validate that the htmlFor prop matches the id of a sibling
 * component in our list of possible control components.
 * @param node - Label node
 * @param controlComponents - List of control components
 */
const validateSiblingHasMatchingId = (
  node: JSXElement,
  controlComponents: string[],
  elementTypeFn: (node: JSXOpeningElement) => string,
  context: ESLintContext,
) => {
  const htmlForAttr = getProp(node.openingElement.attributes, 'htmlFor');
  const htmlForValue = getPropValue(htmlForAttr);

  const parent = getParentElement(node, context);

  // Filter siblings to only include JSXExpressionContainers and JSXElements that match our list of
  // control components.
  const siblingElements = parent?.children.filter(
    (child) => child !== node
      && (child.type === 'JSXExpressionContainer'
        || (child.type === 'JSXElement'
          && child.openingElement
          && controlComponents.some((name) => minimatch(elementTypeFn(child.openingElement), name)))),
  );

  if (!siblingElements || siblingElements.length === 0) {
    return false;
  }

  // Of those siblings, find the one that has an id that matches the htmlFor prop.
  const matchingSibling = siblingElements.find((sibling) => {
    // We can't really do better than just assuming an expression container is valid.
    if (sibling.type === 'JSXExpressionContainer') {
      return true;
    }
    // This is only necessary because the filter operation above doesn't properly type narrow based
    // on the filter condition.
    if (sibling.type !== 'JSXElement') {
      return false;
    }

    const siblingIdAttr = getProp(sibling.openingElement.attributes, 'id');
    const siblingIdValue = getPropValue(siblingIdAttr);

    return htmlForValue === siblingIdValue;
  });

  return !!matchingSibling;
};

const validateHtmlFor = (node, context) => {
  const { settings } = context;
  const htmlForAttributes = settings['jsx-a11y']?.attributes?.for ?? ['htmlFor'];

  for (let i = 0; i < htmlForAttributes.length; i += 1) {
    const attribute = htmlForAttributes[i];
    if (hasProp(node.attributes, attribute)) {
      const htmlForAttr = getProp(node.attributes, attribute);
      const htmlForValue = getPropValue(htmlForAttr);

      return htmlForAttr !== false && !!htmlForValue;
    }
  }

  return false;
};

export default ({
  meta: {
    docs: {
      description: 'Enforce that a `label` tag has a text label and an associated control.',
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const options = context.options[0] || {};
    const labelComponents = options.labelComponents || [];
    const assertType = options.assert || 'either';
    const labelComponentNames = ['label'].concat(labelComponents);
    const elementType = getElementType(context);
    const shouldHtmlForMatchId = !!options.shouldHtmlForMatchId;

    const rule = (node: JSXElement) => {
      const isLabelComponent = labelComponentNames.some((name) => minimatch(elementType(node.openingElement), name));
      if (!isLabelComponent) {
        return;
      }

      const controlComponents = [].concat(
        'input',
        'meter',
        'output',
        'progress',
        'select',
        'textarea',
        options.controlComponents || [],
      );
      // Prevent crazy recursion.
      const recursionDepth = Math.min(
        options.depth === undefined ? 2 : options.depth,
        25,
      );
      const hasHtmlFor = validateHtmlFor(node.openingElement, context);
      // Check for multiple control components.
      const hasNestedControl = controlComponents.some((name) => mayContainChildComponent(node, name, recursionDepth, elementType));
      const hasAccessibleLabel = mayHaveAccessibleLabel(
        node,
        recursionDepth,
        options.labelAttributes,
        elementType,
        controlComponents,
      );

      // Bail out immediately if we don't have an accessible label.
      if (!hasAccessibleLabel) {
        context.report({
          node: node.openingElement,
          message: errorMessages.accessibleLabel,
        });
        return;
      }
      switch (assertType) {
        case 'htmlFor':
          if (!hasHtmlFor) {
            context.report({
              node: node.openingElement,
              message: errorMessages.htmlFor,
            });
            return;
          }
          break;
        case 'nesting':
          if (!hasNestedControl) {
            context.report({
              node: node.openingElement,
              message: errorMessages.nesting,
            });
            return;
          }
          break;
        case 'both':
          if (!hasHtmlFor || !hasNestedControl) {
            context.report({
              node: node.openingElement,
              message: errorMessages.both,
            });
            return;
          }
          break;
        case 'either':
          if (!hasHtmlFor && !hasNestedControl) {
            context.report({
              node: node.openingElement,
              message: errorMessages.either,
            });
            return;
          }
          break;
        default:
          break;
      }
      // Lastly, let's check to see if the htmlFor prop matches the id of a valid sibling or descendent component.
      if (shouldHtmlForMatchId && hasHtmlFor) {
        if (!validateSiblingHasMatchingId(node, controlComponents, elementType, context) && !validateChildHasMatchingId(node, controlComponents, recursionDepth, elementType)) {
          context.report({
            node: node.openingElement,
            message: errorMessages.htmlForShouldMatchId,
          });
        }
      }
    };

    // Create visitor selectors.
    return {
      JSXElement: rule,
    };
  },
}: ESLintConfig);
