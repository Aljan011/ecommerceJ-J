"use client";

import { useStore } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (auth.meEntity) {
      router.push("/");
      return;
    }
  }, [auth, router]);

  return children;
}
