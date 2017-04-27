import { dom } from 'aria-query';
import defaultGlobalSettings from './defaultGlobalSettings';

function getGlobalSettings(context) {
  const {
    settings: { components: defaultComponents, props: defaultProps },
  } = defaultGlobalSettings;
  const globalSettings = context.settings || {};
  const { components: globalComponents, props: globalProps } = globalSettings;
  const components = {
    ...defaultComponents,
    ...globalComponents,
  };
  const props = {
    ...defaultProps,
    ...globalProps,
  };
  return {
    components,
    props,
  };
}

function getRuleSettings(context) {
  return context.options[0] || {};
}

/**
 * Returns an object that maps DOM elements to the user-provided custom components.
 */
export function getCustomComponents(context, ...domElements) {
  const globalComponentSettings = getGlobalSettings(context).components;
  const ruleSettings = getRuleSettings(context); // { a: [ 'Link' ], div: [ 'MyDiv' ] }
  return domElements.reduce((components, element) => {
    const customComponentsForElement = ruleSettings[element] || globalComponentSettings[element];
    return {
      ...components,
      // Always concat low-level DOM element
      [element]: [element].concat(customComponentsForElement || []),
    };
  }, {});
}

/**
 * Returns the DOM element that maps to a custom component.
 * If it cannot be resolved, it returns the custom component.
 */
export function getDOMElementFromCustomComponent(context, component = '') {
  const customComponents = getCustomComponents(context, ...dom.keys());
  return (
    Object.keys(customComponents).find(
      element => customComponents[element].indexOf(component) > -1,
    ) || component
  );
}
