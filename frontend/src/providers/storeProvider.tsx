"use client";

import React, { useReducer } from "react";
import { initialState, rootReducer } from "@/store";
import { StoreContext } from "@/context";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
