import { AuthState, RootAction } from "../types";

export const authInitialState: AuthState = {
  meEntity: null,
  isLoading: true,
};

export const authReducer = (
  state: AuthState,
  action: RootAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        meEntity: action.payload,
        isLoading: false,
      };
    case "START_AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "STOP_AUTH_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        meEntity: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
