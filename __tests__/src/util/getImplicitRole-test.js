import expect from 'expect';
import getImplicitRole from '../../../src/util/getImplicitRole';

describe('getImplicitRole', () => {
  describe('has implicit', () => {
    it('should return the implicit role', () => {
      expect(getImplicitRole(
        'li',
        [],
      )).toBe('listitem');
    });
  });
  describe('lacks implicit', () => {
    it('should return null', () => {
      expect(getImplicitRole(
        'custom-element',
        [],
      )).toBeNull();
    });
  });
});
