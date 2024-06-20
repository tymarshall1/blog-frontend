import { useState } from "react";
import { useSetAccountDetails } from "@/hooks/useSetAccountDetails";
import { useToast } from "./use-toast";
export const useLogin = () => {
  const [statusCode, setStatusCode] = useState<number>(200);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchAccountDetails } = useSetAccountDetails();
  const { toast } = useToast();
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
      const response = await fetch(
        `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        setStatusCode(response.status);
      } else {
        const json = await response.json();
        localStorage.setItem("accessToken", json.token);
        setIsLoading(false);
        setStatusCode(200);
        onSuccess && onSuccess();
        fetchAccountDetails();
        toast({ title: `Welcome back ${username}` });
      }
    } catch (er) {
      setStatusCode(500);
    }
  };

  return { login, statusCode, isLoading };
};
