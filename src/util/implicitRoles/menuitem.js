import hasAttribute from '../hasAttribute';
import DOM from '../attributes/DOM';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for a menuitem tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  const hasType = hasAttribute(attributes, 'type');
  const type = getLiteralAttributeValue(hasType);

  if (hasType && type) {
    switch (type.toUpperCase()) {
      case 'COMMAND':
        return 'menuitem';
      case 'CHECKBOX':
        return 'menuitemcheckbox';
      case 'RADIO':
        return 'menuitemradio';
      default:
        return DOM.MENUITEM.role;
    }
  }

  return DOM.MENUITEM.role;
}
