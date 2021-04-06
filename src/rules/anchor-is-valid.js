/**
 * @fileoverview Performs validity check on anchor hrefs. Warns when anchors are used as buttons.
 * @author Almero Steyn
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import { generateObjSchema, arraySchema, enumArraySchema } from '../util/schemas';

const allAspects = ['noHref', 'invalidHref', 'preferButton'];

const preferButtonErrorMessage = 'Anchor used as a button. Anchors are primarily expected to navigate. Use the button element instead. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const noHrefErrorMessage = 'The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const invalidHrefErrorMessage = 'The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const schema = generateObjSchema({
  components: arraySchema,
  specialLink: arraySchema,
  aspects: enumArraySchema(allAspects, 1),
});

module.exports = ({
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/anchor-is-valid.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => ({
    JSXOpeningElement: (node: JSXOpeningElement): void => {
      const { attributes } = node;
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = ['a'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check anchor elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }

      // Set up the rule aspects to check.
      const aspects = options.aspects || allAspects;

      // Create active aspect flag object. Failing checks will only report
      // if the related flag is set to true.
      const activeAspects = {};
      allAspects.forEach((aspect) => {
        activeAspects[aspect] = aspects.indexOf(aspect) !== -1;
      });

      const propOptions = options.specialLink || [];
      const propsToValidate = ['href'].concat(propOptions);
      const values = propsToValidate
        .map((prop) => getProp(node.attributes, prop))
        .map((prop) => getPropValue(prop));
      // Checks if any actual or custom href prop is provided.
      const hasAnyHref = values
        .filter((value) => value === undefined || value === null).length !== values.length;
      // Need to check for spread operator as props can be spread onto the element
      // leading to an incorrect validation error.
      const hasSpreadOperator = attributes
        .filter((prop) => prop.type === 'JSXSpreadAttribute').length > 0;
      const onClick = getProp(attributes, 'onClick');

      // When there is no href at all, specific scenarios apply:
      if (!hasAnyHref) {
        // If no spread operator is found and no onClick event is present
        // it is a link without href.
        if (!hasSpreadOperator && activeAspects.noHref
          && (!onClick || (onClick && !activeAspects.preferButton))) {
          context.report({
            node,
            message: noHrefErrorMessage,
          });
        }
        // If no spread operator is found but an onClick is preset it should be a button.
        if (!hasSpreadOperator && onClick && activeAspects.preferButton) {
          context.report({
            node,
            message: preferButtonErrorMessage,
          });
        }
        return;
      }

      // Hrefs have been found, now check for validity.
      const invalidHrefValues = values
        .filter((value) => value !== undefined && value !== null)
        .filter((value) => (typeof value === 'string' && (
          !value.length || value === '#' || /^\W*?javascript:/.test(value)
        )));
      if (invalidHrefValues.length !== 0) {
        // If an onClick is found it should be a button, otherwise it is an invalid link.
        if (onClick && activeAspects.preferButton) {
          context.report({
            node,
            message: preferButtonErrorMessage,
          });
        } else if (activeAspects.invalidHref) {
          context.report({
            node,
            message: invalidHrefErrorMessage,
          });
        }
      }
    },
  }),
}: ESLintConfig);
