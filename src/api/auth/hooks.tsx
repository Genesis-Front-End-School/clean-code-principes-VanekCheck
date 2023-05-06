import { useMutation } from "react-query";
import queryClient from "src/configs/queryClient";
import { StorageService } from "src/services";
import { useAuthStore } from "src/store/useAuthStore";
import { getAuthToken } from "./api";
import type { IAuthResponse } from "./types";

export const useAuthTokenMutation = () => {
  const { setIsLogged } = useAuthStore();

  return useMutation<IAuthResponse>({
    mutationKey: ["auth"],
    mutationFn: async () => {
      return getAuthToken().then((data) => {
        return data;
      });
    },
    onSuccess: ({ token }) => {
      StorageService.setValue("token", token);
      setIsLogged(true)

      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  });
};