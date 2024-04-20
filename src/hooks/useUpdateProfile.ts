import { useAuthContext } from "@/hooks/useAuthContext";
import { AccountData } from "@/types/accountData";
import { useEffect, useState } from "react";
import { ProfileFields } from "@/types/profileFields";
import { useToast } from "@/hooks/use-toast";

export const useUpdateProfile = () => {
  const { user } = useAuthContext();
  const [account, setAccount] = useState<AccountData | null>(user);
  const profile = account?.profile;
  const { dispatch } = useAuthContext();
  const [error, setError] = useState<number | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (account) {
      dispatch({ type: "UPDATE", payload: account });
    }
  }, [account]);

  async function updateProfile(profileFields: ProfileFields) {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("firstName", profileFields.firstName);
    formData.append("lastName", profileFields.lastName);
    formData.append("biography", profileFields.biography);
    formData.append("profileImg", profileFields.profileImg);

    if (user) {
      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          body: formData,
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
                profileImg: responseJson.profileImg,
              },
            });
            toast({ title: "Profile has been updated!" });
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
