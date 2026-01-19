"use client";

import { Loader } from "@/components";
import { useStore } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { auth } = useStore();

  useEffect(() => {
    if (!auth.isLoading && !auth.meEntity) {
      router.replace("/login");
      return;
    }
  }, [auth, router]);

  useEffect(() => {
    if (auth.meEntity && auth.meEntity.role !== "ADMIN") {
      router.replace("/");
      return;
    }
  }, [auth, router]);

  if (auth.isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
