import axios, { AxiosError, isAxiosError } from "axios";
import { BASE_URL } from "src/constants/api";
import { removeUserFromLocalStorage } from "src/helpers/user";
import { StorageService, NotifyService } from "services-library";

import { useAuthStore } from "src/store/useAuthStore";

const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use((config: any) => {
  const apiToken: string = StorageService.getValue("token");

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  };
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!isAxiosError(error)) {
      throw new Error("Unknown error");
    }

    if (error.response?.status === 401) {
      removeUserFromLocalStorage();
      useAuthStore.setState({ isLogged: false });
      NotifyService.error("Unauthorized");
    } else {
      NotifyService.error("Something went wrong");
    }
  }
);

export default privateApi;
