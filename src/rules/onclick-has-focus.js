/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */

import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import { getProp, elementType } from 'jsx-ast-utils';
import getTabIndex from '../util/getTabIndex';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'Elements with onClick handlers must be focusable. ' +
  'Either set the tabIndex property to a valid value (usually 0), or use ' +
  'an element type which is inherently focusable such as `button`.';

module.exports = context => ({
  JSXOpeningElement: node => {
    const { attributes } = node;
    if (getProp(attributes, 'onClick') === undefined) {
      return;
    }

    const type = elementType(node);

    if (isHiddenFromScreenReader(type, attributes)) {
      return;
    } else if (isInteractiveElement(type, attributes)) {
      return;
    } else if (getTabIndex(getProp(attributes, 'tabIndex')) !== undefined) {
      return;
    }

    context.report({
      node,
      message: errorMessage,
    });
  },
});

module.exports.schema = [
  { type: 'object' },
];
