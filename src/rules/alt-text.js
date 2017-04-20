/**
 * @fileoverview Enforce all elements that require alternative text have it.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasAccessibleChild';

const DEFAULT_ELEMENTS = [
  'img',
  'object',
  'area',
  'input-image',
];

const schema = generateObjSchema({
  elements: arraySchema,
  img: arraySchema,
  object: arraySchema,
  area: arraySchema,
  'input-image': arraySchema,
});

const ruleByElement = {
  img(context, node) {
    const nodeType = elementType(node);
    const roleProp = getProp(node.attributes, 'role');
    const roleValue = getPropValue(roleProp);
    const isPresentation = roleProp && typeof roleValue === 'string'
      && roleValue.toLowerCase() === 'presentation';

    const altProp = getProp(node.attributes, 'alt');

    // Missing alt prop error.
    if (altProp === undefined) {
      if (isPresentation) {
        context.report({
          node,
          message: 'Prefer alt="" over role="presentation". First rule of aria is to not use aria if it can be achieved via native HTML.',
        });
        return;
      }
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
      });
      return;
    }

    // Check if alt prop is undefined.
    const altValue = getPropValue(altProp);
    const isNullValued = altProp.value === null; // <img alt />

    if ((altValue && !isNullValued) || altValue === '') {
      return;
    }

    // Undefined alt prop error.
    context.report({
      node,
      message: `Invalid alt value for ${nodeType}. Use alt="" for presentational images.`,
    });
  },

  object(context, node) {
    const ariaLabelProp = getProp(node.attributes, 'aria-label');
    const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
    const hasLabel = ariaLabelProp !== undefined || arialLabelledByProp !== undefined;

    if (hasLabel || hasAccessibleChild(node.parent)) {
      return;
    }

    context.report({
      node,
      message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.',
    });
  },

  area(context, node) {
    const ariaLabelProp = getProp(node.attributes, 'aria-label');
    const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
    const hasLabel = ariaLabelProp !== undefined || arialLabelledByProp !== undefined;
    const hasAlt = getProp(node.attributes, 'alt');

    if (hasLabel || hasAlt) {
      return;
    }

    context.report({
      node,
      message: '',
    });
  },

  input(context, node) {
    return node;
  },
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      // Elements to validate for alt text.
      const elementOptions = options.elements || DEFAULT_ELEMENTS;
      // Get custom components for just the elements that will be tested.
      const customComponents = elementOptions
        .map(element => options[element])
        .reduce(
          (components, customComponentsForElement) => components.concat(
            customComponentsForElement || [],
          ),
          [],
        );
      const typesToValidate = [].concat(customComponents, ...elementOptions);
      const nodeType = elementType(node);
      if (typesToValidate.indexOf(nodeType) === -1) {
        return;
      }

      // Map nodeType to the DOM element if we are running this on a custom component.
      let DOMElement = nodeType;
      if (elementOptions.indexOf(nodeType) === -1) {
        DOMElement = elementOptions.find((element) => {
          const customComponentsForElement = options[element] || [];
          return customComponentsForElement.indexOf(nodeType) > -1;
        });
      }

      ruleByElement[DOMElement](context, node);
    },
  }),
};
