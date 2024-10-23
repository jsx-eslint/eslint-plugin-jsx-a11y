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
import type { JSXElement } from 'ast-types-flow';
import minimatch from 'minimatch';
import { generateObjSchema, arraySchema } from '../util/schemas';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import getElementType from '../util/getElementType';
import mayContainChildComponent from '../util/mayContainChildComponent';
import mayHaveAccessibleLabel from '../util/mayHaveAccessibleLabel';

const errorMessage = 'A form label must be associated with a control.';
const errorMessageNoLabel = 'A form label must have accessible text.';

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
});

function validateID(node, context) {
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
}

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

    const rule = (node: JSXElement) => {
      const isLabelComponent = labelComponentNames.some((name) => minimatch(elementType(node.openingElement), name));
      if (!isLabelComponent) {
        return;
      }

      const controlComponents = [
        'input',
        'meter',
        'output',
        'progress',
        'select',
        'textarea',
      ].concat((options.controlComponents || []));
      // Prevent crazy recursion.
      const recursionDepth = Math.min(
        options.depth === undefined ? 2 : options.depth,
        25,
      );
      const hasLabelId = validateID(node.openingElement, context);
      // Check for multiple control components.
      const hasNestedControl = controlComponents.some((name) => mayContainChildComponent(
        node,
        name,
        recursionDepth,
        elementType,
      ));
      const hasAccessibleLabel = mayHaveAccessibleLabel(
        node,
        recursionDepth,
        options.labelAttributes,
        elementType,
        controlComponents,
      );

      if (!hasAccessibleLabel) {
        context.report({
          node: node.openingElement,
          message: errorMessageNoLabel,
        });
        return;
      }

      switch (assertType) {
        case 'htmlFor':
          if (hasLabelId) {
            return;
          }
          break;
        case 'nesting':
          if (hasNestedControl) {
            return;
          }
          break;
        case 'both':
          if (hasLabelId && hasNestedControl) {
            return;
          }
          break;
        case 'either':
          if (hasLabelId || hasNestedControl) {
            return;
          }
          break;
        default:
          break;
      }

      // htmlFor case
      context.report({
        node: node.openingElement,
        message: errorMessage,
      });
    };

    // Create visitor selectors.
    return {
      JSXElement: rule,
    };
  },
}: ESLintConfig);
