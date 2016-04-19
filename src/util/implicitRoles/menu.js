import hasAttribute from '../hasAttribute';
import DOM from '../attributes/DOM';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for a menu tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  const hasType = hasAttribute(attributes, 'type');
  const type = getLiteralAttributeValue(hasType);

  if (hasType && type && type.toUpperCase() === 'TOOLBAR') {
    return 'toolbar';
  }

  return DOM.MENU.role;
}
