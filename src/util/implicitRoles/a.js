import hasAttribute from '../hasAttribute';

/**
 * Returns the implicit role for an anchor tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
