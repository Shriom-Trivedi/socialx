import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null, // user is null if not logged in
  isFetching: false, // isFetching is true if fetching user
  error: null, // error is null if no error
};

export const AuthContext = createContext(INITIAL_STATE);

// This is the provider component that wraps the entire app/page/component.
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
