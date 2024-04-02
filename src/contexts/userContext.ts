import { createContext } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const userContext = createContext<UserContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
