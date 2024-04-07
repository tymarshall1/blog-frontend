import { createContext, useReducer, Dispatch, ReactNode } from "react";

// Define type for state
interface AuthState {
  user: string | null;
}

// Define type for action
type AuthAction = { type: "LOGIN"; payload: string } | { type: "LOGOUT" };

// Define type for context value
interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Initial state
const initialState: AuthState = {
  user: null,
};

// Reducer function
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

// Create context
export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => {},
});

// AuthContextProvider component
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
