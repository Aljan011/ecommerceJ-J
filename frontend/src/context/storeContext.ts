"use client";

import React, { createContext, useContext } from "react";
import { RootAction, RootState } from "@/store";

export const StoreContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<RootAction>;
} | null>(null);

export const useStoreContext = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};
