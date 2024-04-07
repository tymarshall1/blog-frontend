import { AuthContext } from "@/contexts/userContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("use AuthContext must be used inside an AuthContextProvider ");
  }
  return context;
};
