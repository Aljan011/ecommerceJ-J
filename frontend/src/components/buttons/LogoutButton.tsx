"use client";

import { useStore } from "@/hooks";

export const LogoutButton = () => {
  const { auth, dispatch } = useStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  if (!auth.meEntity) return <></>;

  return (
    <button
      onClick={handleLogout}
      className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg overflow-hidden transition-all duration-300 hover:from-red-600 hover:to-pink-700 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>Logout</span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
};
