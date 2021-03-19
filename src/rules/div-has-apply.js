/**
 * @fileoverview check if div has apply text
 * @author Felicia
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  elementType,
  getProp,
  getPropValue,
} from 'jsx-ast-utils';
import { generateObjSchema, arraySchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasApplyText';

// const errorMessage = 'Div should not have text apply/submit. Use button native HTML element instead.';

const actionVerbs = [
  'submit',
  'finish',
  'delete',
  'ok',
  'apply',
];
const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const literalChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText' || child.type === 'Unknown');
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = ['div'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check 'div*' elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }
      if (hasAccessibleChild(node.parent) === false) {
        return;
      }
      if (actionVerbs.includes(literalChildValue && literalChildValue.value.toLowerCase()) === false) {
        return;
      }
      const tabindexProp = getProp(node.attributes, 'tabIndex');
      const roleProp = getProp(node.attributes, 'role');
      // Missing tabindex and role prop error.
      if ((tabindexProp === undefined) || (roleProp === undefined)) {
        context.report({
          node,
          message: 'Missing or incorrect attributes. Action verbs should have aria attributes or native HTML elements. Please define tabIndex="0" attribute and role="button" aria role in the div. Refer to the rule defined by W3C: https://w3c.github.io/aria-practices/examples/button/button.html Otherwise, the first rule of aria is to not use aria with div if it can be achieved via native HTML, like button. Refer to the Living HTML standard on MDN website: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
        return;
      }
      const tabindexValue = getPropValue(tabindexProp);
      if (tabindexValue !== '0') {
        context.report({
          node,
          message: 'Missing or incorrect tabIndex attribute value. Action verbs should have aria attributes or native HTML elements. Please define tabIndex="0" attribute. Refer to the rule defined by W3C: https://w3c.github.io/aria-practices/examples/button/button.html Otherwise, the first rule of aria is to not use aria with div if it can be achieved via native HTML, like button. Refer to the Living HTML standard on MDN website: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
      }
      const roleValue = getPropValue(roleProp);
      if (roleValue !== 'button') {
        context.report({
          node,
          message: 'Missing or incorrect role value. Action verbs should have aria attributes or native HTML elements. Please define role="button" attribute. Refer to the rule defined by W3C: https://w3c.github.io/aria-practices/examples/button/button.html Otherwise, the first rule of aria is to not use aria with div if it can be achieved via native HTML, like button. Refer to the Living HTML standard on MDN website: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
      }
    },
  }),
};
