import getAttribute from '../getAttribute';

/**
 * Returns the implicit role for an area tag.
 */
export default function getImplicitRoleForArea(attributes) {
  if (getAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
