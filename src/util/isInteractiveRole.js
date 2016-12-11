import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import DOMElements from './attributes/DOM.json';

// Map of tagNames to functions that return whether that element is interactive or not.
export const interactiveRoles = [
  'button',
  'checkbox',
  'link',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'spinbutton',
  'tab',
  'textbox',
];

export const nonInteractiveRoles = [
  'alert',
  'alertdialog',
  'dialog',
  'gridcell',
  'log',
  'marquee',
  'progressbar',
  'scrollbar',
  'slider',
  'status',
  'tabpanel',
  'timer',
  'tooltip',
  'treeitem',
  'combobox',
  'grid',
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',
  'article',
  'columnheader',
  'definition',
  'directory',
  'document',
  'group',
  'heading',
  'img',
  'list',
  'listitem',
  'math',
  'note',
  'presentation',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'separator',
  'toolbar',
  'application',
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'search',
];

/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an interactive component. Used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with in the DOM.
 */
const isInteractiveRole = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return true;
  }
  return (interactiveRoles.indexOf(
    (getLiteralPropValue(getProp(attributes, 'role')) || '').toLowerCase(),
  ) > -1);
};

export default isInteractiveRole;
