import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<number | null>(null);
  const { toast } = useToast();

  type PostFields = {
    communityName: string;
    title: string;
    body: string;
  };

  async function createPost(postFields: PostFields) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") {
      setFetchError(401);
      return;
    }
    setLoading(true);
    try {
      setFetchError(null);
      const response = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFields),
      });
      if (!response.ok) {
        throw new Error(response.status.toString());
      } else {
        const json = await response.json();
        setLoading(false);
        toast({ title: "Post Created!" });
        //direct user to the post, probably should make a componenet for a single post
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

  return { loading, fetchError, createPost };
};
