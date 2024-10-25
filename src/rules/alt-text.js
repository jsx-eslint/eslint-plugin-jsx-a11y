/**
 * @fileoverview Enforce all elements that require alternative text have it.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  getProp,
  getPropValue,
  getLiteralPropValue,
} from 'jsx-ast-utils';
import flatMap from 'array.prototype.flatmap';

import { generateObjSchema, arraySchema } from '../util/schemas';
import getElementType from '../util/getElementType';
import hasAccessibleChild from '../util/hasAccessibleChild';
import isPresentationRole from '../util/isPresentationRole';

const DEFAULT_ELEMENTS = [
  'img',
  'object',
  'area',
  'input[type="image"]',
];

const schema = generateObjSchema({
  elements: arraySchema,
  img: arraySchema,
  object: arraySchema,
  area: arraySchema,
  'input[type="image"]': arraySchema,
});

const ariaLabelHasValue = (prop) => {
  const value = getPropValue(prop);
  if (value === undefined) {
    return false;
  }
  if (typeof value === 'string' && value.length === 0) {
    return false;
  }
  return true;
};

const ruleByElement = {
  img(context, node, nodeType) {
    const altProp = getProp(node.attributes, 'alt');

    // Missing alt prop error.
    if (altProp === undefined) {
      if (isPresentationRole(nodeType, node.attributes)) {
        context.report({
          messageId: 'img-presentation-role',
          node,
        });
        return;
      }
      // Check for `aria-label` to provide text alternative
      // Don't create an error if the attribute is used correctly. But if it
      // isn't, suggest that the developer use `alt` instead.
      const ariaLabelProp = getProp(node.attributes, 'aria-label');
      if (ariaLabelProp !== undefined) {
        if (!ariaLabelHasValue(ariaLabelProp)) {
          context.report({
            messageId: 'img-no-aria-label-value',
            node,
          });
        }
        return;
      }
      // Check for `aria-labelledby` to provide text alternative
      // Don't create an error if the attribute is used correctly. But if it
      // isn't, suggest that the developer use `alt` instead.
      const ariaLabelledbyProp = getProp(node.attributes, 'aria-labelledby');
      if (ariaLabelledbyProp !== undefined) {
        if (!ariaLabelHasValue(ariaLabelledbyProp)) {
          context.report({
            messageId: 'img-no-aria-labelledby-value',
            node,
          });
        }
        return;
      }

      context.report({
        data: {
          nodeType,
        },
        messageId: 'img-no-alt',
        node,
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
      data: {
        nodeType,
      },
      messageId: 'img-invalid-alt',
      node,
    });
  },

  object(context, node, unusedNodeType, elementType) {
    const ariaLabelProp = getProp(node.attributes, 'aria-label');
    const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
    const hasLabel = ariaLabelHasValue(ariaLabelProp) || ariaLabelHasValue(arialLabelledByProp);
    const titleProp = getLiteralPropValue(getProp(node.attributes, 'title'));
    const hasTitleAttr = !!titleProp;

    if (hasLabel || hasTitleAttr || hasAccessibleChild(node.parent, elementType)) {
      return;
    }

    context.report({
      messageId: 'object',
      node,
    });
  },

  area(context, node) {
    const ariaLabelProp = getProp(node.attributes, 'aria-label');
    const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
    const hasLabel = ariaLabelHasValue(ariaLabelProp) || ariaLabelHasValue(arialLabelledByProp);

    if (hasLabel) {
      return;
    }

    const altProp = getProp(node.attributes, 'alt');
    if (altProp === undefined) {
      context.report({
        messageId: 'area',
        node,
      });
      return;
    }

    const altValue = getPropValue(altProp);
    const isNullValued = altProp.value === null; // <area alt />

    if ((altValue && !isNullValued) || altValue === '') {
      return;
    }

    context.report({
      messageId: 'area',
      node,
    });
  },

  'input[type="image"]': function inputImage(context, node, nodeType) {
    // Only test input[type="image"]
    if (nodeType === 'input') {
      const typePropValue = getPropValue(getProp(node.attributes, 'type'));
      if (typePropValue !== 'image') { return; }
    }
    const ariaLabelProp = getProp(node.attributes, 'aria-label');
    const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
    const hasLabel = ariaLabelHasValue(ariaLabelProp) || ariaLabelHasValue(arialLabelledByProp);

    if (hasLabel) {
      return;
    }

    const altProp = getProp(node.attributes, 'alt');
    if (altProp === undefined) {
      context.report({
        messageId: 'input-image',
        node,
      });
      return;
    }

    const altValue = getPropValue(altProp);
    const isNullValued = altProp.value === null; // <area alt />

    if ((altValue && !isNullValued) || altValue === '') {
      return;
    }

    context.report({
      messageId: 'input-image',
      node,
    });
  },
};

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/alt-text.md',
      description: 'Enforce all elements that require alternative text have meaningful information to relay back to end user.',
    },
    messages: {
      area: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
      'img-invalid-alt': 'Invalid alt value for {{nodeType}}. Use alt="" for presentational images.',
      'img-presentation-role': 'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.',
      'img-no-alt': '{{nodeType}} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.',
      'img-no-aria-label-value': 'The aria-label attribute must have a value. The alt attribute is preferred over aria-label for images.',
      'img-no-aria-labelledby-value': 'The aria-labelledby attribute must have a value. The alt attribute is preferred over aria-labelledby for images.',
      'input-image': '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
      object: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.',
    },
    schema: [schema],
  },

  create: (context) => {
    const options = context.options[0] || {};
    // Elements to validate for alt text.
    const elementOptions = options.elements || DEFAULT_ELEMENTS;
    // Get custom components for just the elements that will be tested.
    const customComponents = flatMap(
      elementOptions,
      (element) => options[element],
    );
    const typesToValidate = new Set(
      [].concat(
        customComponents,
        elementOptions,
      ).map((type) => (type === 'input[type="image"]' ? 'input' : type)),
    );
    const elementType = getElementType(context);

    return {
      JSXOpeningElement(node) {
        const nodeType = elementType(node);
        if (!typesToValidate.has(nodeType)) { return; }

        let DOMElement = nodeType;
        if (DOMElement === 'input') {
          DOMElement = 'input[type="image"]';
        }

        // Map nodeType to the DOM element if we are running this on a custom component.
        if (elementOptions.indexOf(DOMElement) === -1) {
          DOMElement = elementOptions.find((element) => {
            const customComponentsForElement = options[element] || [];
            return customComponentsForElement.indexOf(nodeType) > -1;
          });
        }

        ruleByElement[DOMElement](context, node, nodeType, elementType);
      },
    };
  },
};
