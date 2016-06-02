/**
 * Calculates the levenshtein distance between two strings.
 */
export default function levenshteinDistance(first, second) {
  const n = first.length;
  const m = second.length;

  // Return right away if either are 0 length.
  if (n === 0) {
    return m;
  } else if (m === 0) {
    return n;
  }

  // Construct matrix
  const matrix = [];
  for (let i = 0; i <= m; i++) {
    matrix[i] = [ i ];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  const substitutionCost = 1;
  const insertionCost = 1;
  const deletionCost = 1;

  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (second.charAt(i - 1) === first.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        const substitution = matrix[i - 1][j - 1] + substitutionCost;
        const insertion = matrix[i][j - 1] + insertionCost;
        const deletion = matrix[i - 1][j] + deletionCost;

        const cost = Math.min(substitution, Math.min(insertion, deletion));

        matrix[i][j] = cost;
      }
    }
  }

  return matrix[second.length][first.length];
}
