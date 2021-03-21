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

const actionVerbs = [
  'advise', 'amplify', 'apply', 'arrange', 'ask',
  'boost', 'build',
  'call', 'click', 'close', 'commit', 'consult', 'compile', 'collect', 'contribute', 'create', 'cut',
  'decrease', 'delete', 'divide', 'drink',
  'eat', 'earn', 'enable', 'enter', 'execute', 'exit', 'expand', 'explain',
  'finish', 'forecast', 'fix',
  'generate',
  'handle', 'help', 'hire', 'hit',
  'improve', 'increase',
  'join', 'jump',
  'leave', 'let\'/s', 'list', 'listen',
  'magnify', 'make', 'manage', 'minimize', 'move',
  'ok', 'open', 'organise', 'oversee',
  'play', 'push',
  'read', 'reduce', 'run',
  'save', 'send', 'shout', 'sing', 'submit', 'support',
  'talk', 'trim',
  'visit', 'volunteer', 'vote',
  'watch', 'win', 'write',
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

      if (actionVerbs.includes(literalChildValue && literalChildValue.value.toLowerCase()) === false) {
        return;
      }

      const tabindexProp = getProp(node.attributes, 'tabIndex');
      const roleProp = getProp(node.attributes, 'role');
      // Missing tabindex and role prop error.
      if ((tabindexProp === undefined) || (roleProp === undefined)) {
        return;
      }
      const tabindexValue = getPropValue(tabindexProp);
      if (tabindexValue !== '0') {
        return;
      }
      const roleValue = getPropValue(roleProp);
      if (roleValue !== 'button') {
        return;
      }
      context.report({
        node,
        message: 'Missing or incorrect attributes. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
      });
    },
  }),
};
