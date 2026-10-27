/**
 * @fileoverview Enforce boolean literals over "true" and "false" strings for ARIA states and properties.
 * @author Thomas Tran
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { aria } from 'aria-query';
import { propName } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const schema = generateObjSchema();

const acceptsBoolean = (attributes) => attributes.type === 'boolean'
  || attributes.type === 'tristate'
  || (attributes.values || []).some((value) => typeof value === 'boolean');

const getStringLiteral = (value) => {
  if (!value) {
    return null;
  }
  if (value.type === 'JSXExpressionContainer') {
    return getStringLiteral(value.expression);
  }
  if ((value.type === 'Literal' || value.type === 'StringLiteral') && typeof value.value === 'string') {
    return value;
  }
  return null;
};

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/prefer-boolean-aria-values.md',
      description: 'Enforce boolean literals over "true" and "false" strings for ARIA states and properties.',
    },
    fixable: 'code',
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      const name = propName(attribute);
      const attributes = aria.get(name.toLowerCase());

      if (attributes === undefined || !acceptsBoolean(attributes)) {
        return;
      }

      const literal = getStringLiteral(attribute.value);
      if (literal === null) {
        return;
      }

      const normalized = literal.value.toLowerCase();
      if (normalized !== 'true' && normalized !== 'false') {
        return;
      }

      context.report({
        node: attribute,
        message: `Use the boolean {${normalized}} instead of the string "${literal.value}" for ${name}.`,
        fix: (fixer) => fixer.replaceText(attribute.value, `{${normalized}}`),
      });
    },
  }),
};
