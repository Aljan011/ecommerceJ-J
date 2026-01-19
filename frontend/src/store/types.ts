import { IUser } from "@/types";

export type AuthState = {
  meEntity: IUser | null;
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
  | { type: "LOGOUT" };

export type UiAction = { type: "START_LOADING" } | { type: "STOP_LOADING" };

export type RootAction = AuthAction | UiAction;
