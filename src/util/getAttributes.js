// @flow

import type { Node, JSXOpeningElement } from 'ast-types-flow';
import { getProp, elementType } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';

const getAttributes = (node: JSXOpeningElement, type: string, context: ESLintContext): Node[] => {
  const { attributes: rawAttributes } = node;
  const { components } = context?.settings?.['jsx-a11y'] || {};

  if (!type || !components) return rawAttributes;

  const jsxElementName = elementType(node);
  const componentConfig = components[jsxElementName];

  if (!componentConfig || componentConfig.component !== type) return rawAttributes;

  const { attributes: settingsAttributes } = typeof componentConfig === 'object' ? componentConfig : {};

  if (!settingsAttributes || typeof settingsAttributes !== 'object') return rawAttributes;

  const mappedAttributes = Object.entries(settingsAttributes).flatMap(([originalAttr, mappedAttrs]) => {
    if (!Array.isArray(mappedAttrs)) return [];

    const originalProp = getProp(rawAttributes, originalAttr);
    return originalProp ? mappedAttrs.map((mappedAttr) => ({
      ...originalProp,
      name: {
        ...originalProp.name,
        name: mappedAttr,
      },
    })) : [];
  });

  return mappedAttributes;
};

export default getAttributes;
