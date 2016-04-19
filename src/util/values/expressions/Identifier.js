'use strict';

/**
 * Extractor function for a Identifier type value node.
 * An Identifier is usually a reference to a variable.
 * Just return variable name to determine its existence.
 *
 * @param - value - AST Value object with type `Identifier`
 * @returns - The extracted value converted to correct type.
 */
export default function extractValueFromIdentifier(value) {
  const { name } = value;

  return name == 'undefined' ? undefined : name;
}
