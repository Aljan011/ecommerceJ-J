import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
  }, []);

  return <>{children}</>;
};
