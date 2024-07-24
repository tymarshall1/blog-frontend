import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SingleComment } from "./singlePost";
import useFetch from "@/hooks/useFetch";
import UserInfo from "@/components/ui/userInfo";
import { useAuthContext } from "@/hooks/useAuthContext";
import { MoreInformation } from "@/components/ui/moreInformation";
import { Comment } from "@/types/comment";
import Loading from "@/components/ui/loading";
import CommentInteraction from "@/components/ui/commentInteraction";

function CommentThread() {
  const { communityName, post, id, commentId } = useParams();
  const [reactionScore, setReactionScore] = useState(0);
  const { isLoading, error, responseData, fetchData } = useFetch<Comment>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/posts/comment-thread/${commentId}`,
    "GET"
  );
  const { user } = useAuthContext();
  const originalPostURL = `/community/${communityName}/${post}/${id}`;
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [commentId]);

  useEffect(() => {
    if (responseData?._id) {
      setReactionScore(
        user?.profile?.likedComments.includes(responseData?._id)
          ? 1
          : user?.profile?.dislikedComments.includes(responseData?._id)
          ? -1
          : 0
      );
    }
  }, [responseData]);

  return (
    <div className="flex gap-2 p-2">
      <div className="flex-1">
        {isLoading && <Loading />}
        {error && (
          <p className="text-center text-white">
            Server error, try again later.
          </p>
        )}
        {responseData && (
          <div className="flex flex-col gap-4">
            <div>
              <Link
                className="text-3xl font-bold underline text-secondary hover:text-white/50"
                to={originalPostURL}
              >
                View Original Post
              </Link>
            </div>
            <div>
              <h2 className="font-semibold text-white font-2xl">
                Comment Thread for:
              </h2>

              <UserInfo
                username={responseData.profile.account?.username || "error"}
                profileImg={responseData.profile.profileImg.toString()}
                timeStamp={responseData.created}
                postOrComment={responseData.comment}
              />
              <CommentInteraction
                likes={responseData.likes}
                dislikes={responseData.dislikes}
                commentID={responseData._id}
                reactionScore={reactionScore}
              />
            </div>

            {responseData.replies && (
              <div className="pl-4 space-y-2 md:pl-6 lg:pl-8">
                {responseData.replies.map((reply, index) => {
                  return (
                    <SingleComment
                      key={index}
                      userIcon={reply.profile.profileImg.toString()}
                      username={reply.profile.account?.username || "error"}
                      commentID={reply._id}
                      created={reply.created}
                      comment={reply.comment}
                      likes={reply.likes}
                      dislikes={reply.dislikes}
                      isReply={reply.isReply}
                      replies={reply.replies}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default CommentThread;
