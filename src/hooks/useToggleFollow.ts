import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useToggleFollow = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<number | null>(null);
  const { toast } = useToast();

  async function toggleFollow(communityName: string | undefined) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") {
      setFetchError(401);
      return;
    }
    if (communityName === undefined) {
      setFetchError(400);
      return;
    }
    setLoading(true);

    try {
      setFetchError(null);
      const response = await fetch(
        "http://localhost:3000/api/user/profile/toggle-followed-community",
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followedCommunities: communityName }),
        }
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      } else {
        const json = await response.json();
        setLoading(false);
        toast({
          title: `${json.followed ? "Followed " : "Unfollowed"} ${
            json.community
          }`,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        if (isNaN(Number(err.message))) {
          setFetchError(500);
          return;
        }
        setFetchError(Number(err.message));
      }
    }
  }

  return { loading, fetchError, toggleFollow };
};
