/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
import { generateObjSchema, arraySchema, enumArraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasAccessibleChild';

const enumValues = ['nesting', 'id'];
const schema = {
  type: 'object',
  properties: {
    components: arraySchema,
    required: {
      oneOf: [
        { type: 'string', enum: enumValues },
        generateObjSchema({ some: enumArraySchema(enumValues) }, ['some']),
        generateObjSchema({ every: enumArraySchema(enumValues) }, ['every']),
      ],
    },
    allowChildren: { type: 'boolean' },
  },
};

const validateNesting = node => node.parent.children.some((child) => {
  const opener = child.openingElement;
  return child.type === 'JSXElement' && opener && opener.name.name === 'input';
});

const validateId = (node) => {
  const htmlForAttr = getProp(node.attributes, 'htmlFor');
  const htmlForValue = getPropValue(htmlForAttr);

  return htmlForAttr !== false && !!htmlForValue;
};

const validate = (node, required, allowChildren) => {
  if (allowChildren === true) {
    return hasAccessibleChild(node.parent);
  }
  if (required === 'nesting') {
    return validateNesting(node);
  }
  return validateId(node);
};

const getValidityStatus = (node, required, allowChildren) => {
  if (Array.isArray(required.some)) {
    const isValid = required.some.some(rule => validate(node, rule, allowChildren));
    const message = !isValid
      ? `Form label must have ANY of the following types of associated control: ${required.some.join(', ')}`
      : null;
    return { isValid, message };
  }
  if (Array.isArray(required.every)) {
    const isValid = required.every.every(rule => validate(node, rule, allowChildren));
    const message = !isValid
      ? `Form label must have ALL of the following types of associated control: ${required.every.join(', ')}`
      : null;
    return { isValid, message };
  }

  const isValid = validate(node, required, allowChildren);
  const message = !isValid
    ? `Form label must have the following type of associated control: ${required}`
    : null;
  return { isValid, message };
};

module.exports = {
  meta: {
    deprecated: true,
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/label-has-for.md',
    },
    schema: [schema],
  },

  create: context => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typesToValidate = ['label'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'label' elements and custom types.
      if (typesToValidate.indexOf(nodeType) === -1) {
        return;
      }

      const required = options.required || { every: ['nesting', 'id'] };
      const allowChildren = options.allowChildren || false;

      const { isValid, message } = getValidityStatus(node, required, allowChildren);
      if (!isValid) {
        context.report({
          node,
          message,
        });
      }
    },
  }),
};
