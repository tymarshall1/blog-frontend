import { limitCharacters } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

type PostProps = {
  community: string;
  user: string;
  timeCreated: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  comments: number;
};

function Post(props: PostProps) {
  //will have to set this when content is loaded in the future
  //for now just keeping set to true

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loaded, setLoaded] = useState(true);
  return (
    <div className="max-w-screen-md p-3 mx-auto space-y-3 overflow-hidden text-black border-2 border-transparent rounded cursor-pointer bg-zinc-300 hover:border-secondary max-h-96">
      {loaded && (
        <>
          <div className="flex items-center gap-1">
            <span className="bg-black rounded-full w-7 h-7"></span>
            <h2 className="font-normal text-md">{props.community}</h2>{" "}
            <span className="text-sm font-normal opacity-50">
              Posted by {props.user} {props.timeCreated} hours ago
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{props.title}</h3>
            <p className="font-light tracking-wide ">
              {limitCharacters(props.body, 200)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex text-sm font-light">
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
                <span className="material-symbols-outlined">thumb_up</span>
                <span>{props.likes}</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary">
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
