/**
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import has from 'has';
import { elementType } from 'jsx-ast-utils';

import type { ESLintContext } from '../../flow/eslint';

const getElementType = (context: ESLintContext): ((node: JSXOpeningElement) => string) => {
  const { settings } = context;
  const componentMap = settings['jsx-a11y']?.components;
  if (!componentMap) {
    return elementType;
  }
  return (node: JSXOpeningElement): string => {
    const rawType = elementType(node);
    return has(componentMap, rawType) ? componentMap[rawType] : rawType;
  };
};

export default getElementType;
