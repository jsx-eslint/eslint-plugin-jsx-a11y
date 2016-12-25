import { getLiteralPropValue } from 'jsx-ast-utils';

/**
 * Returns the tabIndex value.
 */
export default function getTabIndex(tabIndex) {
  const literalValue = getLiteralPropValue(tabIndex);
  // Only consider string and number values.
  if (['string', 'number'].indexOf(typeof literalValue) > -1) {
    // Empty string will convert to zero, so check for it explicity.
    if (
      typeof literalValue === 'string'
      && literalValue.length === 0
    ) {
      return null;
    }
    const value = Number(literalValue);
    if (Number.isNaN(value)) {
      return null;
    }

    return Number.isInteger(value)
      ? value
      : null;
  }

  return null;
}
