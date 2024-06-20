import { useRefreshUser } from "@/hooks/useRefreshUser";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
enum Action {
  TOGGLE_ACTION_LIKE = "TOGGLE_LIKE",
  TOGGLE_ACTION_DISLIKE = "TOGGLE_DISLIKE",
}

function PostInteraction({
  likes,
  dislikes,
  comments,
  postID,
  reactionScore,
  className,
}: {
  likes: number;
  dislikes: number;
  comments: number;
  postID: string;
  reactionScore: number;
  className?: string;
}) {
  const [likesAndDislikes, setLikesAndDislikes] = useState({
    likes: likes,
    dislikes: dislikes,
    reactionScore: reactionScore,
  });
  const { refreshUser } = useRefreshUser();
  function toggleLikeOrDislike(action: Action) {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "undefined";

    if (accessToken === "undefined") return;

    fetch(
      `${
        import.meta.env.VITE_LIMELEAF_BACKEND_URL
      }/api/posts/${postID}/reaction`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: action }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setLikesAndDislikes(json);
        refreshUser();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className={`${className} flex flex-wrap justify-between mt-4 rounded-full p-1 text-white bg-sideNav`}
    >
      <div className="flex text-sm font-light">
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeOrDislike(Action.TOGGLE_ACTION_LIKE);
          }}
          className="flex items-center gap-1 p-1 rounded cursor-pointer "
        >
          <span
            className={`${
              likesAndDislikes.reactionScore === 1 && "text-green-500  "
            } material-symbols-outlined hover:text-green-500`}
          >
            thumb_up
          </span>
          <span>{likesAndDislikes.likes}</span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeOrDislike(Action.TOGGLE_ACTION_DISLIKE);
          }}
          className="flex items-center gap-1 p-1 rounded cursor-pointer"
        >
          <span
            className={`${
              likesAndDislikes.reactionScore === -1 && " text-destructive"
            } material-symbols-outlined hover:text-destructive`}
          >
            thumb_down
          </span>
          <span>{likesAndDislikes.dislikes}</span>
        </div>
      </div>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full hover:bg-secondary hover:text-black">
            <span className="text-2xl material-symbols-outlined">
              more_vert
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer sm:flex hover:bg-secondary hover:text-black">
                <span className="material-symbols-outlined">forum</span>
                <span>{comments} Comments</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
                <span className="material-symbols-outlined">share</span>
                <span>Share</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
                <span className="material-symbols-outlined">bookmark</span>
                <span>Save</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden gap-2 text-sm font-light tracking-wide sm:flex">
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
          <span className="material-symbols-outlined">forum</span>
          <span>{comments} Comments</span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
          <span className="material-symbols-outlined">share</span>
          <span>Share</span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
          <span className="material-symbols-outlined">bookmark</span>
          <span>Save</span>
        </div>
      </div>
    </div>
  );
}

export default PostInteraction;
