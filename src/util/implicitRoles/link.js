import getAttribute from '../getAttribute';

/**
 * Returns the implicit role for a link tag.
 */
export default function getImplicitRoleForLink(attributes) {
  if (getAttribute(attributes, 'href')) {
    return 'link';
  }

  return '';
}
