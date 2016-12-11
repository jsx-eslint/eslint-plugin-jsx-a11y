/* eslint-env mocha */
import assert from 'assert';
import isInteractiveRole, {
  interactiveRoles,
  nonInteractiveRoles,
} from '../../../src/util/isInteractiveRole';
import attrMock from '../../__mocks__/attrMock';

describe('isInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isInteractiveRole(undefined, [])).toBe(true);
    });
  });
  describe('elements with an interactive role', () => {
    it('should identify them as interactive elements', () => {
      interactiveRoles.forEach(role => expect(isInteractiveRole('div', [
        attrMock('role', role)
      ])).toBe(true));
    });
  });
  describe('elements with a non-interactive role', () => {
    it('should not identify them as interactive elements', () => {
      nonInteractiveRoles.forEach(role => expect(isInteractiveRole('div', [
        attrMock('role', role)
      ])).toBe(false));
    });
  });
});
