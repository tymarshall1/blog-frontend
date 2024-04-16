import {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";
import { AccountData } from "@/types/accountData";

interface AuthState {
  user: AccountData | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: AccountData }
  | { type: "LOGOUT" }
  | { type: "UPDATE"; payload: AccountData };

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
    case "UPDATE":
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch("http://localhost:3000/api/user/profile", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((data) => {
          dispatch({ type: "LOGIN", payload: { accessToken, ...data } });
        })
        .catch(() => {
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("accessToken");
        });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
