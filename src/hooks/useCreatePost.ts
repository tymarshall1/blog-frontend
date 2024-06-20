import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
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
      const response = await fetch(
        `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts/create`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postFields),
        }
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      } else {
        const json = await response.json();
        setLoading(false);
        toast({ title: "Post Created!" });
        navigate(`/community/${json.communityName}/${json.title}/${json.id}`);
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
