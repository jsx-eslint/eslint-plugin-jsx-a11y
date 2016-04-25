'use strict';

import ARIA from './attributes/ARIA';



const DICTIONARY = [].concat(Object.keys(ARIA));

const levenshteinDistance = (first, second) => {
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
};

// Max levenshtein distance away from value
// to be considered a decent suggestion.
const THRESHOLD = 3;

export default function getSuggestion(value) {
  const normalizedValue = value.toUpperCase();

  const distances = DICTIONARY.reduce((suggestions, word) => {
    suggestions[word] = levenshteinDistance(normalizedValue, word);
    return suggestions;
  }, {});

  return Object.keys(distances)
    .filter(suggestion => distances[suggestion] <= THRESHOLD)
    .sort((a, b) => distances[a] - distances[b]) // Sort by distance
    .slice(0, 2) // Just return max 2 for now...
    .map(suggestion => suggestion.toLowerCase());
}
