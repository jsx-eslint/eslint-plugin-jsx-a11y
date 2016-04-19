import hasAttribute from '../hasAttribute';
import DOM from '../attributes/DOM';

/**
 * Returns the implicit role for a link tag.
 */
export default function getImplicitRoleForAnchor(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return DOM.LINK.role;
}
