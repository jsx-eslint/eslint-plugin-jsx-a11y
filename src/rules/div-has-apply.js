/**
 * @fileoverview Discourage use of div when text is an action word
 * @author Felicia Kovacs
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

// random list of action verbs in alphabetical order
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
      const TextChildValue = node.parent.children.find((child) => child.type === 'Literal' || child.type === 'JSXText' || child.type === 'Unknown'); // text within div elements
      const options = context.options[0] || {}; // returns e.g.: [object Object]
      const componentOptions = options.components || []; // returns e.g.: Apply - comming from .eslintrc.js file
      const typeCheck = ['div'].concat(componentOptions); // returns e.g.: the string div, Apply
      const nodeType = elementType(node); // returns e.g.: Apply

      // Only check 'div*' elements and custom types.
      // for example, is the Apply custom component present in div,Apply
      // answers the question: is the current node, which is Apply is defined in the componentOptions in the eslintrc.json file?
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }

      if ((actionVerbs.includes(nodeType.toLowerCase()) || nodeType.toLowerCase() === 'button') === true) {
        if (actionVerbs.includes(TextChildValue && TextChildValue.value.toLowerCase()) === false) {
          context.report({
            node,
            message: 'If custom element is an action word then the text within it should also be an action word. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
          });
          return;
        }
      }

      if (actionVerbs.includes(TextChildValue && TextChildValue.value.toLowerCase()) === false) {
        return;
      }

      const tabindexProp = getProp(node.attributes, 'tabIndex');
      const roleProp = getProp(node.attributes, 'role');
      const tabindexValue = getPropValue(tabindexProp);
      const roleValue = getPropValue(roleProp);
      // Missing and/ or incorrect tabindex and role attributes
      if (((tabindexProp === undefined) && (roleProp === undefined)) || ((tabindexValue !== '0') && (roleValue !== 'button'))
        || ((tabindexProp === undefined) && (roleValue !== 'button')) || ((tabindexValue !== '0') && (roleProp === undefined))) {
        context.report({
          node,
          message: 'Missing and/or incorrect attributes. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
        return;
      }

      // Missing and/or incorrect tabindex attribute
      if ((tabindexValue !== '0') || (tabindexProp === undefined)) {
        context.report({
          node,
          message: 'Missing or incorrect role attribute value. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
        return;
      }

      // Missing and/or incorrect role attribute
      if ((roleValue !== 'button') || (roleProp === undefined)) {
        context.report({
          node,
          message: 'Missing or incorrect role value. Action verbs should be contained preferably within a native HTML button element(see first rule of ARIA) or within a div element that has tabIndex="0" attribute and role="button" aria role. Refer to https://w3c.github.io/aria-practices/examples/button/button.html and https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns',
        });
      }
    },
  }),
};
