import getAttribute from '../getAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for a menuitem tag.
 */
export default function getImplicitRoleForMenuitem(attributes) {
  const type = getAttribute(attributes, 'type');

  if (type) {
    const value = getLiteralAttributeValue(type) || '';

    switch (value.toUpperCase()) {
      case 'COMMAND':
        return 'menuitem';
      case 'CHECKBOX':
        return 'menuitemcheckbox';
      case 'RADIO':
        return 'menuitemradio';
      default:
        return '';
    }
  }

  return '';
}
