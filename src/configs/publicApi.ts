import axios, { AxiosError, isAxiosError } from "axios";
import { BASE_URL } from "src/constants/api";
import { NotifyService } from "src/services";

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

publicApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!isAxiosError(error)) {
      throw new Error("Unknown error");
    }
    NotifyService.error("Something went wrong");
  }
);
export default publicApi;
