import { useStoreContext } from "@/store/store";

export const useStore = () => {
  const { state, dispatch } = useStoreContext();

  return {
    state,
    dispatch,
    auth: state.auth,
    ui: state.ui,
  };
};
