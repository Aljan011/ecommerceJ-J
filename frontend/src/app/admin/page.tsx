"use client";

import { LoginForm } from "@/components";
import { useStore } from "@/hooks";
import { useEffect } from "react";

export default function AdminPage() {
  const { auth } = useStore();

  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return <LoginForm />;
}
