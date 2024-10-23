import { getProp, getLiteralPropValue } from 'jsx-ast-utils';

/**
 * Returns the implicit role for a select tag depending on attributes.
 *
 * @see https://www.w3.org/TR/html-aria/#el-select
 */
export default function getImplicitRoleForSelect(attributes) {
  const multiple = getProp(attributes, 'multiple');
  if (multiple && getLiteralPropValue(multiple)) {
    return 'listbox';
  }

  const size = getProp(attributes, 'size');
  const sizeValue = size && getLiteralPropValue(size);

  return sizeValue > 1 ? 'listbox' : 'combobox';
}
