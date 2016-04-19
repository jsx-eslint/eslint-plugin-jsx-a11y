import hasAttribute from '../hasAttribute';

/**
 * Returns the implicit role for a link tag.
 */
export default function getImplicitRoleForLink(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
