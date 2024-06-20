import { useState } from "react";
import { useSetAccountDetails } from "@/hooks/useSetAccountDetails";
import { useToast } from "./use-toast";

export const useSignup = () => {
  const [statusCode, setStatusCode] = useState<number>(200);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchAccountDetails } = useSetAccountDetails();
  const { toast } = useToast();
  const signup = async ({
    username,
    password,
    confirmPassword,
    onSuccess,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
    onSuccess?: () => void;
  }) => {
    setIsLoading(true);
    setStatusCode(200);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, confirmPassword }),
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
        toast({
          title: `Thanks for creating an account! ${username}`,
          description: "Start by customizing your profile!",
        });
      }
    } catch (er) {
      setStatusCode(500);
    }
  };

  return { signup, statusCode, isLoading };
};
