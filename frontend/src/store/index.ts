import { RootState, Action } from "./types";
import { authReducer, authInitialState } from "./reducers/auth.reducer";
import { uiReducer, uiInitialState } from "./reducers/ui.reducer";

export const initialState: RootState = {
  auth: authInitialState,
  ui: uiInitialState,
};

export const rootReducer = (state: RootState, action: Action): RootState => ({
  auth: authReducer(state.auth, action),
  ui: uiReducer(state.ui, action),
});
