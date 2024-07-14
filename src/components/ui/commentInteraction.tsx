import { useAuthContext } from "@/hooks/useAuthContext";
import useFetch from "@/hooks/useFetch";
import { useRefreshUser } from "@/hooks/useRefreshUser";
import { useEffect, useState } from "react";
import LoginSignupDialogs from "./loginSignupDialogs";
enum Action {
  TOGGLE_ACTION_LIKE = "TOGGLE_LIKE",
  TOGGLE_ACTION_DISLIKE = "TOGGLE_DISLIKE",
}
function CommentInteraction({
  likes,
  dislikes,
  commentID,
  reactionScore,
}: {
  likes: number;
  dislikes: number;
  commentID: string;
  reactionScore: number;
}) {
  type Reaction = {
    likes: number;
    dislikes: number;
    reactionScore: number;
  };
  const [likesAndDislikes, setLikesAndDislikes] = useState<Reaction>({
    likes: likes,
    dislikes: dislikes,
    reactionScore: reactionScore,
  });
  const { refreshUser } = useRefreshUser();
  const { user } = useAuthContext();
  const [nonUserTriedInteraction, setNonUserTriedInteraction] = useState(false);
  const { responseData, fetchData } = useFetch<Reaction>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/posts/comment/${commentID}/reaction`,
    "PATCH"
  );

  useEffect(() => {
    const newReactionScore = user?.profile?.likedComments.includes(commentID)
      ? 1
      : user?.profile?.dislikedComments.includes(commentID)
      ? -1
      : 0;

    setLikesAndDislikes((prev) => ({
      ...prev,
      reactionScore: newReactionScore,
    }));
  }, [user, commentID]);

  useEffect(() => {
    setNonUserTriedInteraction(false);
  }, [user]);

  useEffect(() => {
    if (responseData) {
      setLikesAndDislikes(responseData);
      refreshUser();
    }
  }, [responseData]);

  function toggleLikeOrDislike(action: Action) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") return;

    fetchData({ action });
  }
  return (
    <div className="flex">
      {nonUserTriedInteraction && <LoginSignupDialogs />}
      {!nonUserTriedInteraction && (
        <>
          <button
            onClick={() => {
              if (!user) {
                setNonUserTriedInteraction(true);
                return;
              }
              toggleLikeOrDislike(Action.TOGGLE_ACTION_LIKE);
            }}
            className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer "
          >
            <span
              className={`${
                likesAndDislikes &&
                likesAndDislikes.reactionScore === 1 &&
                "text-green-500  "
              } material-symbols-outlined font-thin text-sm`}
            >
              thumb_up
            </span>
            <span className="text-sm ">
              {likesAndDislikes && likesAndDislikes.likes}
            </span>
          </button>

          <button
            onClick={() => {
              if (!user) {
                setNonUserTriedInteraction(true);
                return;
              }
              toggleLikeOrDislike(Action.TOGGLE_ACTION_DISLIKE);
            }}
            className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer "
          >
            <span
              className={`${
                likesAndDislikes &&
                likesAndDislikes.reactionScore === -1 &&
                "text-destructive "
              } material-symbols-outlined font-thin text-sm`}
            >
              thumb_down
            </span>
            <span className="text-sm ">
              {likesAndDislikes && likesAndDislikes.dislikes}
            </span>
          </button>

          <button className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer">
            <span className="text-sm font-thin material-symbols-outlined">
              mode_comment
            </span>
            <span className="text-sm">Reply</span>
          </button>
        </>
      )}
    </div>
  );
}

export default CommentInteraction;
