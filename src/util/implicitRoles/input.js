import getAttribute from '../getAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';



/**
 * Returns the implicit role for an input tag.
 */
export default function getImplicitRoleForInput(attributes) {
  const type = getAttribute(attributes, 'type');

  if (type) {
    const value = getLiteralAttributeValue(type) || '';

    switch (value.toUpperCase()) {
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
      case 'EMAIL':
      case 'PASSWORD':
      case 'SEARCH': // with [list] selector it's combobox
      case 'TEL': // with [list] selector it's combobox
      case 'URL': // with [list] selector it's combobox
      default:
        return 'textbox';
    }
  }

  return 'textbox';
}
