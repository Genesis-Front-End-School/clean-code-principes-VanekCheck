import { getIsLoggedIn, removeUserFromLocalStorage } from '../user';
import { StorageService } from 'services-library';

const mockGetValue = jest.spyOn(StorageService, 'getValue');
const mockRemoveValue = jest.spyOn(StorageService, 'removeValue');

beforeEach(() => {
  mockGetValue.mockReset();
  mockRemoveValue.mockReset();
});

describe('getIsLoggedIn', () => {
  it('when token in storage', () => {
    mockGetValue.mockReturnValue('token');
    expect(getIsLoggedIn()).toBe(true);
  });

  it('when no token in storage', () => {
    mockGetValue.mockReturnValue(null);
    expect(getIsLoggedIn()).toBe(false);
  });
});

describe('removeUserFromLocalStorage', () => {
  it('removes the token from storage', () => {
    removeUserFromLocalStorage();
    expect(mockRemoveValue).toHaveBeenCalledWith('token');
  });
});
