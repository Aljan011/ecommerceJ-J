import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api/axios-client";
import { IUser } from "@/types/user";

export type LoginMutationResponse = {
  token: string;
  user: IUser;
};

export type LoginMutationPayload = {
  email: string;
  password: string;
};

export type MeQueryResponse = IUser;

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginMutationResponse,
    Error,
    LoginMutationPayload
  >,
) => {
  return useMutation<LoginMutationResponse, Error, LoginMutationPayload>({
    mutationKey: ["login"],
    mutationFn: (payload) => apiClient.post("/login", payload),
    ...options,
  });
};

export const useMeQuery = (
  options?: Omit<UseQueryOptions<MeQueryResponse>, "queryKey" | "queryFn">,
) => {
  return useQuery<MeQueryResponse>({
    queryKey: ["me"],
    queryFn: () => apiClient.get("/me"),
    retry: false,
    ...options,
  });
};
