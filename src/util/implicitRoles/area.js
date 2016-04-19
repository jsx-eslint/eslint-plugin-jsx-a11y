import hasAttribute from '../hasAttribute';

/**
 * Returns the implicit role for an area tag.
 */
export default function getImplicitRoleForArea(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
