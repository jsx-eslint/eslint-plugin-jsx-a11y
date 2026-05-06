/**
 * @fileoverview Enforce lang attribute has a valid value.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getLiteralPropValue, getProp } from 'jsx-ast-utils';
import tags from 'language-tags';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import getElementType from '../util/getElementType';
import { generateObjSchema } from '../util/schemas';

const htmlHasLangErrorMessage = '<html> elements must have the lang prop.';
const langErrorMessage = 'lang attribute must have a valid value.';

const schema = generateObjSchema({
  htmlHasLang: {
    type: 'boolean',
    default: false,
  },
});

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/lang.md',
      description: 'Enforce lang attribute has a valid value.',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const checkHtmlHasLang = context.options[0]?.htmlHasLang ?? false;
        const langProp = getProp(node.attributes, 'lang');
        const value = getLiteralPropValue(langProp);
        const type = elementType(node);

        if (type && type !== 'html') {
          return;
        }

        if (checkHtmlHasLang && (langProp === undefined || value === undefined)) {
          context.report({
            node,
            message: htmlHasLangErrorMessage,
          });
          return;
        }

        // Don't check identifiers
        if (value === null) {
          return;
        }
        if (langProp === undefined || value === undefined) {
          return;
        }

        if (tags.check(value)) {
          return;
        }

        context.report({
          node,
          message: langErrorMessage,
        });
      },
    };
  },
}: ESLintConfig);
