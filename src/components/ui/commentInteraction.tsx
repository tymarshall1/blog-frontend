import { useAuthContext } from "@/hooks/useAuthContext";
import useFetch from "@/hooks/useFetch";
import { useRefreshUser } from "@/hooks/useRefreshUser";
import { useEffect, useState } from "react";
import LoginSignupDialogs from "./loginSignupDialogs";
import PostEditor from "@/forms/components/postEditor";
import { Button } from "./button";
import { useParams } from "react-router-dom";
import { SingleComment } from "@/pages/singlePost";
import { Comment } from "@/types/comment";
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
  const [newComment, setNewComment] = useState("");
  const [newCommentError, setNewCommentError] = useState("");
  const [replyClicked, setReplyClicked] = useState(false);
  const { id: postID } = useParams();
  const { error, responseData, fetchData } = useFetch<Reaction>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/posts/comment/${commentID}/reaction`,
    "PATCH"
  );
  const {
    error: replyError,
    responseData: replyData,
    fetchData: sendReply,
  } = useFetch<Comment>(
    `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts/${postID}/comment`,
    "POST"
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

  function handleSubmitComment() {
    switch (true) {
      case newComment === "<p></p>":
        setNewCommentError("Comment must not be empty.");
        return;
      case newComment === "":
        setNewCommentError("Comment must not be empty.");
        return;
      case newComment.length < 9:
        setNewCommentError("Comment be at least 2 characters long.");
        return;
      default:
        sendReply({ commentID, comment: newComment, isReply: true });
        setNewComment("");
        setReplyClicked(false);
    }
  }

  function handleSetComment(comment: string) {
    setNewCommentError("");
    setNewComment(comment);
  }

  function toggleLikeOrDislike(action: Action) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") return;

    fetchData({ action });
  }
  return (
    <div className="">
      {nonUserTriedInteraction && <LoginSignupDialogs />}
      {error && (
        <p className="text-white">
          Error connecting to server, try again later.
        </p>
      )}
      {!nonUserTriedInteraction && (
        <>
          <div className="flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
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
              onClick={(e) => {
                e.stopPropagation();
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

            <button
              onClick={(e) => {
                e.stopPropagation();
                setReplyClicked(replyClicked === true ? false : true);
              }}
              className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer"
            >
              <span className="text-sm font-thin material-symbols-outlined">
                mode_comment
              </span>
              <span className="text-sm">Reply</span>
            </button>
          </div>
          {replyData && (
            <div className={`pl-6`}>
              <SingleComment
                userIcon={replyData.profile.profileImg.toString()}
                username={replyData.profile.account?.username || "error"}
                commentID={replyData._id}
                created={replyData.created}
                comment={replyData.comment}
                likes={0}
                dislikes={0}
                isReply={true}
                replies={[]}
                newComment={true}
              />
            </div>
          )}
          {replyClicked && (
            <div className="pr-2">
              <label
                className="text-xl font-medium text-white"
                htmlFor={"comment"}
              >
                Reply
              </label>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white rounded "
              >
                <PostEditor
                  className="pb-4 min-h-20"
                  setBody={handleSetComment}
                  id={"comment"}
                />
              </div>
              <p className="text-destructive">
                {newCommentError && <>*{newCommentError}</>}
              </p>
              <div className="flex justify-end gap-2 my-2 ">
                <Button
                  onClick={() => {
                    setNewCommentError("");
                    setNewComment("");
                    setReplyClicked(false);
                  }}
                  type="button"
                  variant={"destructive"}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitComment} type="button">
                  {"Submit"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CommentInteraction;
