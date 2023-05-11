import { StorageService } from "src/services";

export const getIsLoggedIn = (): boolean => !!StorageService.getValue("token");

export const removeUserFromLocalStorage = (): void => {
  StorageService.removeValue("token");
};
