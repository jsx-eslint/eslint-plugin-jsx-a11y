import hasAttribute from '../hasAttribute';
import DOM from '../attributes/DOM';

/**
 * Returns the implicit role for an anchor tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return DOM.A.role;
}
