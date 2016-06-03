/* eslint-env mocha */
'use strict';

import assert from 'assert';
import getSuggestion from '../../../src/util/getSuggestion';

describe('spell check suggestion API', () => {
  it('should return no suggestions given empty word and no dictionary', () => {
    const word = '';
    const expected = [];
    const actual = getSuggestion(word);

    assert.deepEqual(expected, actual);
  });

  it('should return no suggestions given real word and no dictionary', () => {
    const word = 'foo';
    const expected = [];
    const actual = getSuggestion(word);

    assert.deepEqual(expected, actual);
  });

  it('should return correct suggestion given real word and a dictionary', () => {
    const word = 'fo';
    const dictionary = [ 'foo', 'bar', 'baz' ];
    const expected = [ 'foo' ];
    const actual = getSuggestion(word, dictionary);

    assert.deepEqual(expected, actual);
  });

  it('should return multiple correct suggestions given real word and a dictionary', () => {
    const word = 'theer';
    const dictionary = [ 'there', 'their', 'foo', 'bar' ];
    const expected = [ 'their', 'there' ];
    const actual = getSuggestion(word, dictionary);

    assert.deepEqual(expected, actual);
  });

  it('should return one correct suggestion given real word and a dictionary and a limit of 1', () => {
    const word = 'theer';
    const dictionary = [ 'there', 'their', 'foo', 'bar' ];
    const expected = [ 'their' ];
    const actual = getSuggestion(word, dictionary, 1);

    assert.deepEqual(expected, actual);
  });
});
