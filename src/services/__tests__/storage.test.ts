import { StorageService } from '../storage';

describe('Storage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getValue method', () => {
    it('should return null when no value is stored for the given property', () => {
      const value = StorageService.getValue('test-value');
      expect(value).toBeNull();
    });

    it('should return the stored value for the given property', () => {
      const expectedValue = { test: 'test' };
      localStorage.setItem('testProperty', JSON.stringify(expectedValue));

      const value = StorageService.getValue('testProperty');
      expect(value).toEqual(expectedValue);
    });
  });

  describe('setValue method', () => {
    it('should store the given value for the given property', () => {
      const expectedValue = { test: 'test' };
      StorageService.setValue('testProperty', expectedValue);

      const storedValue = JSON.parse(localStorage.getItem('testProperty')!);
      expect(storedValue).toEqual(expectedValue);
    });
  });

  describe('removeValue method', () => {
    it('should remove the stored value for the given property', () => {
      localStorage.setItem('testProperty', 'test');
      StorageService.removeValue('testProperty');

      const storedValue = localStorage.getItem('testProperty');
      expect(storedValue).toBeNull();
    });
  });
});
