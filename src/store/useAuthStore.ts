import { getIsLoggedIn, removeUserFromLocalStorage } from "src/helpers/user";
import { create } from "zustand";

type AuthState = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogged: getIsLoggedIn() || false,
  setIsLogged: (isLogged: boolean): void => set(() => ({ isLogged })),
  logout: (): void => {
    removeUserFromLocalStorage();
    return set({ isLogged: false });
  },
}));
