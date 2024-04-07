import { createContext, useReducer, Dispatch, ReactNode } from "react";

interface AuthState {
  user: string | null;
}

type AuthAction = { type: "LOGIN"; payload: string } | { type: "LOGOUT" };

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
