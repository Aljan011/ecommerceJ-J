import { AuthState, RootAction } from "../types";

export const authInitialState: AuthState = {
  meEntity: null,
};

export const authReducer = (
  state: AuthState,
  action: RootAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        meEntity: action.payload,
      };
    case "LOGOUT":
      return authInitialState;
    default:
      return state;
  }
};
