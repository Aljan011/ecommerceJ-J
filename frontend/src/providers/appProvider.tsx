"use client";

import { QueryProvider } from "./queryProvider";
import { StoreProvider } from "./storeProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <StoreProvider>{children}</StoreProvider>
    </QueryProvider>
  );
};
