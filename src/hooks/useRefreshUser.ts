import { useAuthContext } from "./useAuthContext";

export const useRefreshUser = () => {
  const { dispatch } = useAuthContext();

  const refreshUser = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetch(`${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/user/profile`, {
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
  };
  return { refreshUser };
};
