import hasAttribute from '../hasAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for a menu tag.
 */
export default function getImplicitRoleForMenu(attributes) {
  const hasType = hasAttribute(attributes, 'type');

  if (hasType) {
    const type = getLiteralAttributeValue(hasType);

    return (type && type.toUpperCase() === 'TOOLBAR') ? 'toolbar' : '';
  }

  return '';
}
