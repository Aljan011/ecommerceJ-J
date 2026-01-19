"use client";

import { LoginForm } from "@/components";
import { useStore } from "@/hooks";
import { useLoginMutation } from "@/lib";
import { useEffect } from "react";

export default function LoginPage() {
  const { dispatch } = useStore();
  const { mutate, isError, data, isPending } = useLoginMutation();

  useEffect(() => {
    if (data) {
      console.log("Login successful:", data);
      localStorage.setItem("accessToken", data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
    }
  }, [data, dispatch]);

  return (
    <LoginForm
      onSubmit={(email, password) => {
        mutate({ email, password });
      }}
      isLoading={isPending}
      isError={isError}
    />
  );
}
