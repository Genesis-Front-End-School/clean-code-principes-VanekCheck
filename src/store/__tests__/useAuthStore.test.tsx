import { renderHook } from '@testing-library/react-hooks';
import { useAuthStore } from '../useAuthStore';
import { getIsLoggedIn, removeUserFromLocalStorage } from '../../helpers/user';

jest.mock('../../helpers/user');

describe('useAuth store', () => {
  beforeEach(() => {
    (getIsLoggedIn as jest.Mock).mockClear();
    (removeUserFromLocalStorage as jest.Mock).mockClear();
  });

  it('initializes with the correct default state', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.isLogged).toBe(false);
  });

  it('sets the isLogged state to true when setIsLogged is called with true', () => {
    const { result } = renderHook(() => useAuthStore());
    result.current.setIsLogged(true);
    expect(result.current.isLogged).toBe(true);
  });

  it('calls removeUserFromLocalStorage and sets the isLogged state to false when logout is called', () => {
    const { result } = renderHook(() => useAuthStore());
    result.current.logout();
    expect(removeUserFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(result.current.isLogged).toBe(false);
  });
});
