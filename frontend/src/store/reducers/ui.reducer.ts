import { UIState, RootAction } from "../types";

export const uiInitialState: UIState = {
  loading: false,
};

export const uiReducer = (state: UIState, action: RootAction): UIState => {
  switch (action.type) {
    case "START_LOADING":
      return { loading: true };
    case "STOP_LOADING":
      return { loading: false };
    default:
      return state;
  }
};
