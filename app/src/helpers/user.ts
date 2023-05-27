import { StorageService } from 'services-library';

export const getIsLoggedIn = (): boolean => !!StorageService.getValue('token');

export const removeUserFromLocalStorage = (): void => {
  StorageService.removeValue('token');
};
