import hasAttribute from '../hasAttribute';
import { getLiteralAttributeValue } from '../getAttributeValue';

/**
 * Returns the implicit role for an img tag.
 */
export default function getImplicitRoleForImg(attributes) {
  const hasAlt = hasAttribute(attributes, 'alt');

  if (hasAlt && getLiteralAttributeValue(hasAlt) === '') {
    return 'presentation';
  }

  return 'img';
}
