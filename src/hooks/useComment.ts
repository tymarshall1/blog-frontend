import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<number | null>(null);
  const { toast } = useToast();
  const [newComment, setNewComment] = useState(null);
  type CommentFields = {
    comment: string;
    isReply: boolean;
  };

  async function createComment(
    commentFields: CommentFields,
    postID: string | undefined
  ) {
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
        `${
          import.meta.env.VITE_LIMELEAF_BACKEND_URL
        }/api/posts/${postID}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentFields),
        }
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      } else {
        const json = await response.json();
        setLoading(false);
        toast({ title: "Comment Created!" });
        setFetchError(null);
        setNewComment(json);
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

  return { loading, fetchError, createComment, newComment };
};
