"use client";

import React, { useState, FormEvent } from "react";

export const LoginForm: React.FC<{
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  isError?: boolean;
}> = ({ onSubmit, isLoading = false, isError = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add your login logic here
    onSubmit(email, password);
  };

  return (
    <div className="w-max max-w-md mx-auto flex justify-center items-center min-h-screen px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 py-10 w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Login In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200 ease-in-out
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200 ease-in-out
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                         dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>

            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 
                       dark:hover:text-blue-300 font-medium transition duration-150"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                     py-3 px-4 rounded-lg transition duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform active:scale-95"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {isError && (
          <p className="mt-4 text-sm text-red-600 text-center">
            Invalid email or password.
          </p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                       dark:hover:text-blue-300 font-medium transition duration-150"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
