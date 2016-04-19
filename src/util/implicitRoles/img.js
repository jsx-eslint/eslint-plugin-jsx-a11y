import getAttribute from '../getAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for an img tag.
 */
export default function getImplicitRoleForImg(attributes) {
  const alt = getAttribute(attributes, 'alt');

  if (alt && getLiteralAttributeValue(alt) === '') {
    return 'presentation';
  }

  return 'img';
}
