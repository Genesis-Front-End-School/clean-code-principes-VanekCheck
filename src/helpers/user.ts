import { StorageService } from "src/services";

export const getIsLoggedIn = () => StorageService.getValue("token");

export const removeUserFromLocalStorage = () => {
  StorageService.removeValue("token");
};
