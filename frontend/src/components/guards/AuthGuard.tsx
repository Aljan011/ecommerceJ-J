"use client";

import { useStore } from "@/hooks";
import { useMeQuery } from "@/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { auth, dispatch } = useStore();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const { data, isLoading, isError } = useMeQuery({
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    if (isLoading) {
      return;
    }

    if (isError || !data) {
      localStorage.removeItem("accessToken");
      router.replace("/login");
      return;
    }
  }, [accessToken, auth, data, router, isLoading, isError]);

  return <>{children}</>;
};
