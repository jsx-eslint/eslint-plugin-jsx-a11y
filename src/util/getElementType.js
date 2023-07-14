/**
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import has from 'has';
import { elementType, getProp, getLiteralPropValue } from 'jsx-ast-utils';

import type { ESLintContext } from '../../flow/eslint';

const getElementType = (context: ESLintContext): ((node: JSXOpeningElement) => string) => {
  const { settings } = context;
  const polymorphicPropName = settings['jsx-a11y']?.polymorphicPropName;
  const componentMap = settings['jsx-a11y']?.components;

  return (node: JSXOpeningElement): string => {
    const polymorphicProp = polymorphicPropName ? getLiteralPropValue(getProp(node.attributes, polymorphicPropName)) : undefined;
    const rawType = polymorphicProp ?? elementType(node);

    if (!componentMap) {
      return rawType;
    }

    return has(componentMap, rawType) ? componentMap[rawType] : rawType;
  };
};

export default getElementType;
