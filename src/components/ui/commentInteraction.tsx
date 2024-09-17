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
import { toast } from "@/hooks/use-toast";
import Loading from "./loading";
import fetchError from "@/errorHandling/requestErrors";

enum Action {
  TOGGLE_ACTION_LIKE = "TOGGLE_LIKE",
  TOGGLE_ACTION_DISLIKE = "TOGGLE_DISLIKE",
}
function CommentInteraction({
  likes,
  dislikes,
  commentID,
  reactionScore,
  username,
  comment,
  commentChangeFunction,
}: {
  likes: number;
  dislikes: number;
  commentID: string;
  reactionScore: number;
  username: string;
  comment: string;
  commentChangeFunction: (comment: string) => void;
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
  const [editClicked, setEditClicked] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const { id: postID } = useParams();
  const [commentEditError, setCommentEditError] = useState("");
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

  const {
    error: editError,
    isLoading: editLoading,
    fetchData: sendEdit,
    responseData: editResponse,
  } = useFetch<Comment>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/posts/${postID}/comment/edit`,
    "PATCH"
  );

  useEffect(() => {
    setNonUserTriedInteraction(false);
  }, [user]);

  useEffect(() => {
    if (responseData) {
      setLikesAndDislikes(responseData);
      refreshUser();
    }
  }, [responseData]);

  useEffect(() => {
    if (editError) {
      const error = fetchError(editError);
      setCommentEditError(error);
    } else if (editResponse) {
      commentChangeFunction(editedComment);
      toast({ title: "Comment Updated!" });
      setEditClicked(false);
    }
  }, [editResponse, editError]);

  function handleSubmitComment() {
    const isCommentEmpty = (): boolean => {
      const trimmedComment = newComment.trim();
      const emptyContentRegex = /^<p>\s*<\/p>$/;
      return !trimmedComment || emptyContentRegex.test(trimmedComment);
    };

    if (isCommentEmpty()) {
      setNewCommentError("Comment be at least 2 characters long.");
    } else {
      sendReply({ commentID, comment: newComment, isReply: true });
      setNewComment("");
      setReplyClicked(false);
    }
  }

  function handleSetComment(comment: string) {
    setNewCommentError("");
    setNewComment(comment);
  }

  function handleEditComment() {
    //submit request
    const isCommentEmpty = (): boolean => {
      const trimmedComment = editedComment.trim();
      const emptyContentRegex = /^<p>\s*<\/p>$/;
      return !trimmedComment || emptyContentRegex.test(trimmedComment);
    };

    if (isCommentEmpty()) {
      setCommentEditError("Comment must be at least 2 characters long.");
    } else {
      setCommentEditError("");
      sendEdit({ commentID, editedComment });
    }
  }

  function editCommentHelper(newComment: string) {
    setEditedComment(newComment);
  }

  function toggleLikeOrDislike(action: Action) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") return;

    fetchData({ action });
  }
  return (
    <div className="text-white">
      {nonUserTriedInteraction && <LoginSignupDialogs />}
      {error ||
        (replyError && (
          <p className="text-white">
            Error connecting to server, try again later.
          </p>
        ))}
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
            {user && user.username === username && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditClicked(editClicked === true ? false : true);
                }}
                className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer"
              >
                <span className="text-sm font-thin material-symbols-outlined">
                  mode_comment
                </span>
                <span className="text-sm">Edit</span>
              </button>
            )}
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
                reactionScore={replyData.reactionScore || 0}
              />
            </div>
          )}

          {editClicked && (
            <div>
              <label
                onClick={(e) => e.stopPropagation()}
                className="text-xl font-medium text-white"
                htmlFor={"editComment"}
              >
                Edit Comment
              </label>
              {commentEditError ? (
                <p className="text-destructive">{commentEditError}</p>
              ) : (
                ""
              )}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white rounded "
              >
                <PostEditor
                  className="pb-4 min-h-20"
                  setBody={editCommentHelper}
                  defaultText={editedComment}
                  id={"editComment"}
                />
              </div>
              <div className="flex justify-end gap-2 pr-1 my-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditClicked(false);
                    setEditedComment(comment);
                    setCommentEditError("");
                  }}
                  type="button"
                  variant={"destructive"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditComment();
                  }}
                  type="button"
                >
                  {editLoading ? (
                    <div className="flex p-2">
                      <Loading color="black" />
                    </div>
                  ) : (
                    "Edit"
                  )}
                </Button>
              </div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewCommentError("");
                    setNewComment("");
                    setReplyClicked(false);
                  }}
                  type="button"
                  variant={"destructive"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmitComment();
                  }}
                  type="button"
                >
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
