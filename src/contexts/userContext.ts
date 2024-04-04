import { createContext } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userData: { username: string } | null;
  isLoading: boolean;
  error: number | null;
}

export const userContext = createContext<UserContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: {
    username: "",
  },
  isLoading: false,
  error: null,
});
