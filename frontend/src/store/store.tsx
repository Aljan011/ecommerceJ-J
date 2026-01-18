"use client";

import React, { createContext, useContext, useReducer } from "react";
import { rootReducer, initialState } from "./index";
import { RootState, Action } from "./types";

const StoreContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};
