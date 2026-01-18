export type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

export type UIState = {
  loading: boolean;
};

export type RootState = {
  auth: AuthState;
  ui: UIState;
};

export type Action =
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGOUT" }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" };
