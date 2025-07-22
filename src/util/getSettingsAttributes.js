// @flow

import type { Node, JSXOpeningElement } from 'ast-types-flow';
import { elementType, getProp, propName } from 'jsx-ast-utils';
import type { ESLintSettings } from '../../flow/eslint';

/**
 * Looks at the `settings` global config for custom component attribute mappings
 * This works for use cases where a custom component uses a prop name that renders to a specific attribute on the DOM element
 *
 * @example
 * {
 *   'jsx-a11y': {
 *     components: {
 *       Link: {
 *         component: 'a',
 *         attributes: {
 *           href: ['foo'],
 *         },
 *       },
 *     },
 *   },
 * }
 *
 * <Link foo="path/to/page" /> // will be checked as if <a href="path/to/page" />
 */
const getSettingsAttributes = (node: JSXOpeningElement, settings: ESLintSettings): Node[] => {
  const { attributes: rawAttributes } = node;
  const { components } = settings?.['jsx-a11y'] || {};

  if (!components || typeof components !== 'object') return rawAttributes;

  const jsxElementName = elementType(node);
  const componentConfig = components[jsxElementName];

  const { attributes: settingsAttributes } = typeof componentConfig === 'object' ? componentConfig : {};

  if (!settingsAttributes || typeof settingsAttributes !== 'object') return rawAttributes;

  const mappedRawAttrNames = new Set();

  const mappedAttributes = Object.entries(settingsAttributes).flatMap(([originalAttr, mappedAttrs]) => {
    if (!Array.isArray(mappedAttrs)) return [];

    return mappedAttrs.flatMap((mappedAttr) => {
      const originalProp = getProp(rawAttributes, mappedAttr);

      if (originalProp) {
        mappedRawAttrNames.add(mappedAttr);
        return [{
          ...originalProp,
          name: {
            ...originalProp.name,
            name: originalAttr,
          },
        }];
      }
      return [];
    });
  });

  // raw attributes that don't have mappings
  const unmappedAttributes = rawAttributes.filter((attr) => !mappedRawAttrNames.has(propName(attr)));

  return [...unmappedAttributes, ...mappedAttributes];
};

export default getSettingsAttributes;
