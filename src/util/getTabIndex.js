'use strict';

import getAttributeValue, { getLiteralAttributeValue } from './getAttributeValue';



/**
 * Returns the tabIndex value.
 */
export default function getTabIndex(tabIndex) {
  // First test if we can extract a literal value
  // to see if it's a valid tabIndex. If not, then just see if
  // one exists as an expression.
  const literalTabIndex = getLiteralAttributeValue(tabIndex);
  if (literalTabIndex !== undefined || literalTabIndex !== null) {
    return isNaN(Number(literalTabIndex)) ? undefined : literalTabIndex;
  }

  return getAttributeValue(tabIndex);
}
