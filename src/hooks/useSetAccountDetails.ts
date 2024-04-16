import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSetAccountDetails = () => {
  const [statusCode, setStatusCode] = useState<number>(200);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const fetchAccountDetails = () => {
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
          setStatusCode(200);
        })
        .catch((error) => {
          setStatusCode(error.message);
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return { fetchAccountDetails, statusCode, isLoading };
};
