'use strict';

import ARIA from './attributes/ARIA';
import levenshtein from './suggestions/levenshtein';



const DICTIONARY = [].concat(Object.keys(ARIA));
// Max distance away from value to be considered a decent suggestion.
const THRESHOLD = 3;
// Number of suggestions to return.
const LIMIT = 2;

export default function getSuggestion(value, dictionary = DICTIONARY, threshold = THRESHOLD, limit = LIMIT) {
  const normalizedValue = value.toUpperCase();

  const distances = DICTIONARY.reduce((suggestions, word) => {
    suggestions[word] = levenshtein(normalizedValue, word);
    return suggestions;
  }, {});

  return Object.keys(distances)
    .filter(suggestion => distances[suggestion] <= threshold)
    .sort((a, b) => distances[a] - distances[b]) // Sort by distance
    .slice(0, limit)
    .map(suggestion => suggestion.toLowerCase());
}
