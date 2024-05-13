import { limitCharacters } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
};

function Post(props: PostProps) {
  const [loaded] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/community/${props.community}/${props.title}/${props.id}`)
      }
      className="max-w-screen-md p-3 mx-auto space-y-1 overflow-hidden text-black border-2 border-transparent rounded cursor-pointer lg:w-[41rem] bg-zinc-300 hover:border-secondary max-h-96"
    >
      {loaded && (
        <>
          <div className="flex items-center gap-1">
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

            <div className="text-sm font-normal  text-black/50">
              Posted by{" "}
              <Link
                onClick={(e) => e.stopPropagation()}
                className="hover:text-secondary"
                to={`/user/${props.user}`}
              >
                {props.user}
              </Link>{" "}
              {props.timeCreated} hours ago
            </div>
          </div>
          <div className="prose prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 ">
            <h3 className="mb-2 text-2xl font-semibold">{props.title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: limitCharacters(props.body, 200),
              }}
            ></p>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex text-sm font-light">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("like button click");
                }}
                className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
              >
                <span className="material-symbols-outlined">thumb_up</span>
                <span>{props.likes}</span>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("dislike button click");
                }}
                className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
              >
                <span className="material-symbols-outlined">thumb_down</span>
                <span>{props.dislikes}</span>
              </div>
            </div>
            <div className="flex gap-2 text-sm font-light tracking-wide">
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
                <span className="material-symbols-outlined">forum</span>
                <span>{props.comments} Comments</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
                <span className="material-symbols-outlined">share</span>
                <span>Share</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
                <span className="material-symbols-outlined">bookmark</span>
                <span>Save</span>
              </div>
            </div>
          </div>
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
