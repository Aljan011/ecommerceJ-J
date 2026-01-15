"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/auth.service";
import api from "@/lib/axios";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: "ADMIN";
}

interface AdminAuthContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ============================
  // 🔁 Restore session on refresh
  // ============================
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

    api
      .get("/auth/me") // must be a protected endpoint
      .then((res) => {
        if (res.data.role !== "ADMIN") {
          throw new Error("Not admin");
        }

        setAdmin({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: "ADMIN",
        });
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        delete api.defaults.headers.common.Authorization;
        setAdmin(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ============================
  // 🔐 Login
  // ============================
  const login = async (email: string, password: string) => {
    const { token, user } = await adminLogin(email, password);

    if (user.role !== "ADMIN") {
      throw new Error("Access denied");
    }

    setAdmin({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "ADMIN",
    });

    setToken(token);
    localStorage.setItem("adminToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    router.push("/admin");
  };

  // ============================
  // 🚪 Logout
  // ============================
  const logout = () => {
    localStorage.removeItem("adminToken");
    delete api.defaults.headers.common.Authorization;
    setAdmin(null);
    setToken(null);
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, token, loading, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
