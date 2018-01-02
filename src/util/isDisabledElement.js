/**
 * @flow
 */

import { getProp, getLiteralPropValue, getPropValue } from 'jsx-ast-utils';
import type { Node } from 'ast-types-flow';

const isDisabledElement = (attributes: Array<Node>): boolean => {
  const disabledAttr = getProp(attributes, 'disabled');
  const disabledAttrValue = getPropValue(disabledAttr);
  const isHTML5Disabled = disabledAttr && disabledAttrValue !== undefined;
  if (isHTML5Disabled) {
    return true;
  }
  const ariaDisabledAttr = getProp(attributes, 'aria-disabled');
  const ariaDisabledAttrValue = getLiteralPropValue(ariaDisabledAttr);

  if (
    ariaDisabledAttr
    && ariaDisabledAttrValue !== undefined
    && ariaDisabledAttrValue === true
  ) {
    return true;
  }
  return false;
};

export default isDisabledElement;
