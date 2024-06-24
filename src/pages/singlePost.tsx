import { UserPost } from "@/types/post";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MoreInformation } from "@/components/ui/moreInformation";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";
import TextArea from "@/forms/components/textArea";
import { Button } from "@/components/ui/button";
import PostEditor from "@/forms/components/postEditor";
import { useComment } from "@/hooks/useComment";
import { Comment } from "@/types/comment";
import { useAuthContext } from "@/hooks/useAuthContext";
import { timeSince } from "@/lib/utils";
import PostInteraction from "@/components/ui/postInteraction";

type CommunitySectionProps = {
  title: string;
  data: string | number | string[] | React.ReactNode;
};

function CommunitySection(props: CommunitySectionProps) {
  return (
    <div className="px-2 pt-2 space-y-1 ">
      <h2 className="text-lg font-black text-secondary">{props.title}</h2>
      <div className="pb-2 tracking-wider border-b-[1px] border-white">
        {props.data}
      </div>
    </div>
  );
}

type PostHeaderProps = {
  communityIcon: string;
  communityName: string;
  username: string;
  creationTime: string;
};

function PostHeader(props: PostHeaderProps) {
  const communityRef = useRef<HTMLAnchorElement | null>(null);

  function toggleTextHighlightOnHover() {
    communityRef.current
      ? communityRef.current.classList.toggle("text-secondary")
      : "";
  }

  return (
    <section className="flex items-center gap-2 pb-2 mx-4 mt-2 text-white border-b-2 border-sideNav">
      <Link to={`/community/${props.communityName}`}>
        <img
          src={props.communityIcon}
          className="w-12 h-12 rounded-full"
          alt="community icon"
          onMouseEnter={toggleTextHighlightOnHover}
          onMouseLeave={toggleTextHighlightOnHover}
        />
      </Link>

      <div>
        <div className="space-x-2">
          <Link
            ref={communityRef}
            className="text-lg font-medium hover:text-secondary"
            to={`/community/${props.communityName}`}
          >
            {props.communityName}
          </Link>
          <span className="text-sm font-light text-white/50">
            {timeSince(props.creationTime)}
          </span>
        </div>
        <Link
          className="text-sm font-normal tracking-wide hover:text-secondary"
          to={`/user/${props.username}`}
        >
          {props.username}
        </Link>
      </div>
    </section>
  );
}

type PostBodyProps = {
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  comments: number;
  postID: string | undefined;
  reactionScore: number;
  community: string;
};

function PostBody(props: PostBodyProps) {
  const postLink = `/community/${props.community}/${props.title}/${props.postID}`;
  return (
    <section className="px-4 space-y-4 ">
      <h1 className="max-w-4xl py-1 overflow-hidden text-4xl font-bold text-white break-words break-all ">
        {props.title}
      </h1>
      <div className="max-w-4xl bg-white border-2 border-gray-600 rounded">
        <div
          dangerouslySetInnerHTML={{ __html: props.body }}
          className="max-w-4xl p-3 mb-4 overflow-hidden prose text-black prose-pre:break-all md:prose-pre:break-words prose-pre:whitespace-pre-wrap prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-black"
        ></div>
        {props.postID && (
          <PostInteraction
            likes={props.likes}
            dislikes={props.dislikes}
            comments={props.comments}
            postID={props.postID}
            reactionScore={props.reactionScore}
            className="rounded-none"
            postLink={postLink}
          />
        )}
        {!props.postID && (
          <p className="text-destructive">An error occurred with post stats.</p>
        )}
      </div>
    </section>
  );
}

function CommentInteraction() {
  return (
    <div className="flex">
      <div className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer ">
        <span className="text-sm font-thin material-symbols-outlined ">
          thumb_up
        </span>
        <span className="text-sm ">{"435k"}</span>
      </div>

      <div className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer ">
        <span className="text-sm font-thin material-symbols-outlined">
          thumb_down
        </span>
        <span className="text-sm ">{"12.5k"}</span>
      </div>

      <div className="flex items-center gap-1 p-1 hover:rounded-full hover:bg-secondary hover:text-black hover:cursor-pointer">
        <span className="text-sm font-thin material-symbols-outlined">
          mode_comment
        </span>
        <span className="text-sm">Reply</span>
      </div>
    </div>
  );
}

type SingleCommentProps = {
  userIcon: string;
  username: string;
  created: string;
  comment: string;
  newComment?: boolean;
};
function SingleComment(props: SingleCommentProps) {
  const userRef = useRef<HTMLAnchorElement | null>(null);

  function toggleTextHighlightOnHover() {
    userRef.current ? userRef.current.classList.toggle("text-secondary") : "";
  }
  return (
    <div
      className={`${
        props.newComment ? "bg-gray-600" : ""
      } text-white border-l-[1px] border-secondary pl-2 py-1`}
    >
      <div className="flex gap-2">
        <Link to={`/user/${props.username}`}>
          <img
            className="w-10 h-10 rounded-full min-w-10 min-h-10"
            src={props.userIcon}
            alt="users icon"
            onMouseEnter={toggleTextHighlightOnHover}
            onMouseLeave={toggleTextHighlightOnHover}
          />
        </Link>

        <div>
          <div>
            <Link
              ref={userRef}
              className="font-bold hover:text-secondary"
              to={`/user/${props.username}`}
            >
              {props.username}
            </Link>
            <span className="ml-1 text-sm text-white/50">
              {timeSince(props.created)}
            </span>
          </div>
          <div
            className="max-w-4xl mb-3 overflow-hidden font-normal prose text-white break-words break-all prose-pre:break-all md:prose-pre:break-words prose-blockquote:text-white prose-pre:whitespace-pre-wrap prose-h1:text-white prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-white"
            dangerouslySetInnerHTML={{ __html: props.comment }}
          ></div>
        </div>
      </div>
      <CommentInteraction />
    </div>
  );
}

function CommentSection({
  comments,
  newComment,
}: {
  comments: Comment[];
  newComment: Comment | null;
}) {
  return (
    <section className="mx-4 space-y-3">
      {newComment && (
        <SingleComment
          userIcon={newComment.profile.profileImg.toString()}
          username={newComment.profile.account?.username || ""}
          created={newComment.created}
          comment={newComment.comment}
          newComment={newComment ? true : false}
        />
      )}
      {comments &&
        comments.map((comment: Comment, index) => (
          <SingleComment
            key={index}
            userIcon={comment.profile.profileImg.toString()}
            username={comment.profile.account?.username || ""}
            created={comment.created}
            comment={comment.comment}
          />
        ))}
    </section>
  );
}

function SinglePost() {
  const { communityName, post, id } = useParams();
  const [userPost, setUserPost] = useState<UserPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [textAreaClick, setTextAreaClick] = useState(false);
  const {
    loading: commentLoading,
    fetchError: commentFetchError,
    createComment,
    newComment,
  } = useComment();
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setFetchError(true);
          throw new Error("Server error");
        }
        setUserPost(data);
      })
      .catch(() => {
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, [communityName, post]);

  useEffect(() => {
    switch (true) {
      case commentFetchError === 200:
        setCommentError("");
        return;
      case commentFetchError === 401 || commentFetchError === 403:
        setCommentError("Invalid credentials, please log back in.");
        return;
      case commentFetchError === 400:
        setCommentError("Incorrect comment formatting.");
        return;
      case commentFetchError === 500:
        setCommentError("Server error, try again later.");
        return;
    }
  }, [commentFetchError]);

  function handleSetComment(comment: string) {
    setCommentError("");
    setComment(comment);
  }

  function handleSubmitComment() {
    switch (true) {
      case comment === "<p></p>":
        setCommentError("Comment must not be empty.");
        return;
      case comment === "":
        setCommentError("Comment must not be empty.");
        return;
      case comment.length < 9:
        setCommentError("Comment be at least 2 characters long.");
        return;
      default:
        createComment({ comment: comment }, id);
        setComment("");
        setTextAreaClick(false);
    }
  }

  return (
    <div className="flex mb-4">
      {loading && <Loading />}
      {fetchError && (
        <div className="flex gap-5">
          <h1 className="flex-1 block p-4 mx-auto text-4xl font-bold text-white">
            Server error, try again later.
          </h1>
          <MoreInformation defaultInformation={true}>
            <></>
          </MoreInformation>
        </div>
      )}
      {userPost && (
        <>
          <div className="flex-1">
            <div className="space-y-5 ">
              <PostHeader
                communityIcon={userPost.community.communityIcon.toString()}
                communityName={userPost.community.name}
                username={userPost.author.account.username}
                creationTime={userPost.created}
              />
              <PostBody
                title={userPost.title}
                body={userPost.body}
                likes={userPost.likes}
                dislikes={userPost.dislikes}
                community={userPost.community.name}
                comments={
                  typeof userPost.comments === "object"
                    ? userPost.comments.length
                    : userPost.comments
                }
                postID={id}
                reactionScore={
                  user?.profile?.likedPosts.includes(userPost._id)
                    ? 1
                    : user?.profile?.dislikedPosts.includes(userPost._id)
                    ? -1
                    : 0
                }
              />
              <div className="sr-only" id="comments"></div>
              <form action="" className="max-w-2xl mx-4">
                {!textAreaClick && (
                  <>
                    {user && (
                      <>
                        <TextArea
                          className={`${
                            textAreaClick ? "hidden" : "rounded-full"
                          } px-2 `}
                          label={"Comment"}
                          id={"comment"}
                          onClick={() => {
                            setTextAreaClick(true);
                          }}
                          error={false}
                        />
                        <p className="text-destructive">
                          {commentFetchError && <p>*{commentError}</p>}
                        </p>
                      </>
                    )}
                    {!user && (
                      <h1 className="text-xl font-bold text-white">
                        You need to be logged in to leave a comment.
                      </h1>
                    )}
                  </>
                )}

                {textAreaClick && (
                  <>
                    <label
                      className="text-xl font-medium text-white"
                      htmlFor={"comment"}
                    >
                      Comment
                    </label>
                    <div className="bg-white rounded ">
                      <PostEditor
                        className="pb-4 min-h-20"
                        setBody={handleSetComment}
                        id={"comment"}
                      />
                    </div>
                    <p className="text-destructive">
                      {commentError && <>*{commentError}</>}
                    </p>
                    <div className="flex justify-end gap-2 my-2 ">
                      <Button
                        onClick={() => {
                          setTextAreaClick(false);
                          setCommentError("");
                          setComment("");
                        }}
                        type="button"
                        variant={"destructive"}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitComment} type="button">
                        {commentLoading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </>
                )}
              </form>
              <CommentSection
                comments={
                  typeof userPost.comments === "object" ? userPost.comments : []
                }
                newComment={newComment}
              />
            </div>
          </div>

          <div className="hidden mx-10 lg:block">
            <MoreInformation defaultInformation={fetchError}>
              <>
                <div className="px-2 pt-2">
                  <Link to={`/community/${userPost.community.name}`}>
                    <h3 className="mb-2 text-4xl font-black text-center text-secondary hover:opacity-80">
                      {userPost.community.name}
                    </h3>
                  </Link>

                  <p className="pb-2 border-b-[1px] border-white">
                    {userPost.community.description}
                  </p>
                </div>
                <CommunitySection
                  title={"Followers"}
                  data={userPost.community.followers}
                />
                <CommunitySection
                  title={"Tags"}
                  data={
                    typeof userPost.community.tags === "object" && (
                      <div className="flex flex-wrap gap-2">
                        {userPost.community.tags.map((tags: string) => (
                          <Badge key={tags}>{tags}</Badge>
                        ))}
                      </div>
                    )
                  }
                />
                <CommunitySection
                  title={"Created"}
                  data={userPost.community.created}
                />
              </>
            </MoreInformation>
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePost;
