import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [statusCode, setStatusCode] = useState<number>(200);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async ({
    username,
    password,
    onSuccess,
  }: {
    username: string;
    password: string;
    onSuccess?: () => void;
  }) => {
    setIsLoading(true);
    setStatusCode(200);
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setIsLoading(false);
        setStatusCode(response.status);
      } else {
        const json = await response.json();
        localStorage.setItem("accessToken", json.token);
        dispatch({ type: "LOGIN", payload: json.token });
        setIsLoading(false);
        setStatusCode(200);
        onSuccess && onSuccess();
      }
    } catch (er) {
      setStatusCode(500);
    }
  };

  return { login, statusCode, isLoading };
};
