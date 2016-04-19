import hasAttribute from '../hasAttribute';
import DOM from '../attributes/DOM';

/**
 * Returns the implicit role for an area tag.
 */
export default function getImplicitRoleForArea(attributes) {
  if (hasAttribute(attributes, 'href')) {
    return 'link';
  }

  return DOM.AREA.role;
}
