import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { timeSince } from "@/lib/utils";
import PostInteraction from "./postInteraction";
type PostProps = {
  community: string;
  user: string;
  timeCreated: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  comments: number;
  id: string;
  communityIcon: string;
  onClick?: () => void;
  reactionScore?: number;
};

function Post(props: PostProps) {
  const [loaded] = useState(true);
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/community/${props.community}/${props.title}/${props.id}`)
      }
      className="max-w-screen-md  mx-auto space-y-1 overflow-hidden text-black border-2 border-transparent rounded cursor-pointer lg:w-[45rem] bg-zinc-300 hover:border-secondary max-h-[30rem]"
    >
      {loaded && (
        <>
          <div className="flex items-center gap-1 p-3">
            <Link
              className="flex items-center gap-1 hover:text-secondary"
              onClick={(e) => e.stopPropagation()}
              to={`/community/${props.community}`}
            >
              <img
                className="rounded-full w-7 h-7"
                src={props.communityIcon}
                alt="community icon"
              />
              <h2 className="font-normal text-md">{props.community}</h2>{" "}
            </Link>

            <div className="text-sm font-normal text-black/50">
              Posted by{" "}
              <Link
                onClick={(e) => e.stopPropagation()}
                className="hover:text-secondary"
                to={`/user/${props.user}`}
              >
                {props.user}
              </Link>{" "}
              {timeSince(props.timeCreated)}
            </div>
          </div>
          <div className="px-3">
            <h3 className="mb-2 text-2xl font-semibold break-words">
              {props.title}
            </h3>
            <p
              className="max-w-4xl mb-3 overflow-hidden prose text-black break-words max-h-80 prose-pre:break-all md:prose-pre:break-words prose-pre:whitespace-pre-wrap prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-black"
              dangerouslySetInnerHTML={{
                __html: props.body,
              }}
            ></p>
          </div>
          <PostInteraction
            likes={props.likes}
            dislikes={props.dislikes}
            comments={props.comments}
            postID={props.id}
            reactionScore={props.reactionScore || 0}
            className="rounded-none"
          />
        </>
      )}
      {!loaded && (
        <>
          <Skeleton className="h-[25px] w-full rounded-xl" />
          <Skeleton className="h-[15rem] w-full rounded-xl" />
        </>
      )}
    </div>
  );
}

export default Post;
