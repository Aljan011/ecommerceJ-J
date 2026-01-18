import { AuthState, Action } from "../types";

export const authInitialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        accessToken: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return authInitialState;
    default:
      return state;
  }
};
