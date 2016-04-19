import getAttribute from '../getAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for a menu tag.
 */
export default function getImplicitRoleForMenu(attributes) {
  const type = getAttribute(attributes, 'type');

  if (type) {
    const value = getLiteralAttributeValue(type);

    return (value && value.toUpperCase() === 'TOOLBAR') ? 'toolbar' : '';
  }

  return '';
}
