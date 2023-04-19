import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/constants/api";
import { getFromLocalStorage } from "src/helpers/localStorage";
import { removeUserFromLocalStorage } from "src/helpers/user";
import { useAuthStore } from "src/store/useAuthStore";

const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use((config: any) => {
  const apiToken = getFromLocalStorage("token");

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
      toast.error("Unauthorized");
    } else {
      toast.error("Something went wrong");
    }
  }
);

export default privateApi;
