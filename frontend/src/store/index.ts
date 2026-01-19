import {
  authInitialState,
  authReducer,
  uiInitialState,
  uiReducer,
} from "./reducers";
import { RootState, RootAction } from "./types";

export const initialState: RootState = {
  auth: authInitialState,
  ui: uiInitialState,
};

export const rootReducer = (
  state: RootState,
  action: RootAction,
): RootState => ({
  auth: authReducer(state.auth, action),
  ui: uiReducer(state.ui, action),
});

export * from "./types";
