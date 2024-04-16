import { useAuthContext } from "@/hooks/useAuthContext";
import { AccountData } from "@/types/accountData";
import { useEffect, useState } from "react";

type ProfileFields = {
  firstName: string;
  lastName: string;
  biography: string;
};

export const useUpdateProfile = () => {
  const { user } = useAuthContext();
  const [account, setAccount] = useState<AccountData | null>(user);
  const profile = account?.profile;
  const { dispatch } = useAuthContext();
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    if (account) {
      dispatch({ type: "UPDATE", payload: account });
    }
  }, [account]);

  async function updateProfile(profileFields: ProfileFields) {
    const accessToken = localStorage.getItem("accessToken");
    if (user) {
      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(profileFields),
        });
        if (!response.ok) {
          throw new Error(response.status.toString());
        } else {
          const responseJson = await response.json();
          if (account && profile) {
            setAccount({
              ...account,
              profile: {
                ...profile,
                firstName: responseJson.firstName,
                lastName: responseJson.lastName,
                biography: responseJson.biography,
              },
            });
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          if (isNaN(Number(err.message))) {
            setError(500);
            return;
          }
          setError(Number(err.message));
        }
      }
    }
  }

  return { updateProfile, error };
};
