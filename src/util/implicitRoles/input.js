import hasAttribute from '../hasAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';
import DOM from '../attributes/DOM';

/**
 * Returns the implicit role for an input tag.
 */
export default function getImplicitRoleForInput(attributes) {
  const hasType = hasAttribute(attributes, 'type');

  if (hasType) {
    const type = getLiteralAttributeValue(hasType);

    switch (type.toUpperCase()) {
      case 'BUTTON':
      case 'IMAGE':
      case 'RESET':
      case 'SUBMIT':
        return 'button';
      case 'CHECKBOX':
        return 'checkbox';
      case 'RADIO':
        return 'radio';
      case 'RANGE':
        return 'slider';
      // These will resolve to `textbox` in default.
      case 'EMAIL':
      case 'PASSWORD':
      case 'SEARCH': // with [list] selector it's combobox
      case 'TEL': // with [list] selector it's combobox
      case 'URL': // with [list] selector it's combobox
      default:
        return DOM.INPUT.role;
    }
  }

  return DOM.INPUT.role; // 'textbox'
}
