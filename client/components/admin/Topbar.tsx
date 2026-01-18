"use client";

import { useAdminAuth } from "@/context/AdminAuthContext";

export default function Topbar() {
  const { admin, logout } = useAdminAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold">Dashboard</div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{admin?.email}</span>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
