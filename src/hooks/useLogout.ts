import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
    toast({ title: "Logging out", description: "Come back soon!" });
    navigate("/");
  };
  return { logout };
};
