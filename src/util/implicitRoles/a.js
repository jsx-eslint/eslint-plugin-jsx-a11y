import getAttribute from '../getAttribute';

/**
 * Returns the implicit role for an anchor tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  if (getAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
