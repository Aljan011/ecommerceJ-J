import { IUser } from "@/types";

export type AuthState = {
  meEntity: IUser | null;
  isLoading: boolean;
};

export type UIState = {
  loading: boolean;
};

export type RootState = {
  auth: AuthState;
  ui: UIState;
};

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: IUser }
  | { type: "LOGOUT" }
  | { type: "START_AUTH_LOADING" }
  | { type: "STOP_AUTH_LOADING" };

export type UiAction = { type: "START_LOADING" } | { type: "STOP_LOADING" };

export type RootAction = AuthAction | UiAction;
