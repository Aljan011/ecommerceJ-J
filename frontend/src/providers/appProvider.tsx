"use client";

import { AuthProvider } from "./authProvider";
import { QueryProvider } from "./queryProvider";
import { StoreProvider } from "./storeProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <StoreProvider>
        <AuthProvider />
        {children}
      </StoreProvider>
    </QueryProvider>
  );
};
