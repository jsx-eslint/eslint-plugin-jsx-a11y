import { getProp } from 'jsx-ast-utils';

const getAttributes = (node, type, context) => {
  const { settings } = context;
  const { attributes } = node;
  const components = settings['jsx-a11y']?.components;

  if (!components || !type) {
    return attributes;
  }

  const componentConfig = Object.entries(components).find(([, config]) => (
    config && typeof config === 'object' && config.component === type
  ));

  if (!componentConfig) {
    return attributes;
  }

  const [, config] = componentConfig;
  const attributeMap = config && typeof config === 'object' ? config.attributes : null;

  if (!attributeMap || typeof attributeMap !== 'object') {
    return attributes;
  }

  const mappedAttributes = [...attributes];

  Object.entries(attributeMap).forEach(([originalAttr, mappedAttrs]) => {
    if (Array.isArray(mappedAttrs)) {
      mappedAttrs.forEach((mappedAttr) => {
        const mappedProp = getProp(attributes, mappedAttr);
        if (mappedProp) {
          const newAttribute = {
            ...mappedProp,
            name: {
              ...mappedProp.name,
              name: originalAttr,
            },
          };
          mappedAttributes.push(newAttribute);
        }
      });
    }
  });

  return mappedAttributes;
};

export default getAttributes;
