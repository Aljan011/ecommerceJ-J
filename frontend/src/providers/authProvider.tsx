"use client";

import { useStore } from "@/hooks";
import { useMeQuery } from "@/lib";
import { useEffect } from "react";

export const AuthProvider = () => {
  const { dispatch } = useStore();

  const { data, isLoading, isError } = useMeQuery({
    retry: false,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return;
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("accessToken");
      dispatch({ type: "LOGOUT" });
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      dispatch({ type: "STOP_AUTH_LOADING" });
      return;
    }
    dispatch({ type: "START_AUTH_LOADING" });
  }, [isLoading, dispatch]);

  return null;
};
