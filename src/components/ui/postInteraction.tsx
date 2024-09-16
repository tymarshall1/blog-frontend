import { useRefreshUser } from "@/hooks/useRefreshUser";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import LoginSignupDialogs from "./loginSignupDialogs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "@/lib/utils";
import EditPost from "@/forms/components/editPost";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  postLink,
  usernameOfPost,
  postTitle,
  postBody,
}: {
  likes: number;
  dislikes: number;
  comments: number;
  postID: string;
  reactionScore: number;
  className?: string;
  postLink: string;
  usernameOfPost?: string;
  postTitle?: string;
  postBody?: string;
}) {
  const [likesAndDislikes, setLikesAndDislikes] = useState({
    likes: likes,
    dislikes: dislikes,
    reactionScore: reactionScore,
  });
  const { refreshUser } = useRefreshUser();
  const { user } = useAuthContext();
  const [nonUserTriedInteraction, setNonUserTriedInteraction] = useState(false);
  const [shareOpened, setShareOpened] = useState(false);
  const [moreInteractionsOpened, setMoreInteractionsOpened] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const moreInteractionsRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  useEffect(() => {
    setNonUserTriedInteraction(false);
  }, [user]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShareOpened(false);
      }

      if (
        moreInteractionsRef.current &&
        !moreInteractionsRef.current.contains(event.target as Node)
      ) {
        setMoreInteractionsOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`${className} flex flex-wrap justify-between mt-4 rounded-full p-1 text-white bg-sideNav`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex text-sm font-light"
      >
        {nonUserTriedInteraction && (
          <div className="pl-1">
            <LoginSignupDialogs />
          </div>
        )}
        {!nonUserTriedInteraction && (
          <>
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  setNonUserTriedInteraction(true);
                  return;
                }
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
                if (!user) {
                  setNonUserTriedInteraction(true);
                  return;
                }
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
          </>
        )}
      </div>
      <div className="sm:hidden">
        <DropdownMenu open={moreInteractionsOpened}>
          <DropdownMenuTrigger
            ref={moreInteractionsRef}
            onClick={(e) => {
              e.stopPropagation();
              setMoreInteractionsOpened(true);
            }}
            className="rounded-full hover:bg-secondary hover:text-black"
          >
            <span className="text-2xl material-symbols-outlined">
              more_vert
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${postLink}#comments`);
                  scrollToSection("comments");
                  setMoreInteractionsOpened(false);
                }}
                className="flex items-center gap-1 p-1 rounded cursor-pointer sm:flex hover:text-black"
              >
                <span className="material-symbols-outlined">forum</span>
                <span>
                  {comments} {comments === 1 ? " Comment" : " Comments"}
                </span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    window.location.origin + postLink
                  );
                  setMoreInteractionsOpened(false);
                  toast({ title: "Link Copied to Clipboard!" });
                }}
                className="flex items-center w-full h-full gap-1 p-1 rounded cursor-pointer hover:text-black"
              >
                <span className="material-symbols-outlined">share</span>
                <span>Share</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                onClick={() => setMoreInteractionsOpened(false)}
                className="flex items-center gap-1 p-1 rounded cursor-pointer hover:text-black"
              >
                <span className="material-symbols-outlined">bookmark</span>
                <span>Save</span>
              </div>
            </DropdownMenuItem>

            {user && user.username === usernameOfPost && (
              <>
                <DropdownMenuItem>
                  <button>
                    <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
                      <span className="material-symbols-outlined">edit</span>
                      <span>Edit</span>
                    </div>
                  </button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden gap-2 text-sm font-light tracking-wide sm:flex">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`${postLink}#comments`);
            scrollToSection("comments");
          }}
          className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black"
        >
          <span className="material-symbols-outlined">forum</span>
          <span>
            {comments} {comments === 1 ? " Comment" : " Comments"}
          </span>
        </button>

        <DropdownMenu open={shareOpened}>
          <DropdownMenuTrigger
            ref={dropdownRef}
            onClick={(e) => {
              e.stopPropagation();
              setShareOpened(true);
            }}
            className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black"
          >
            <span className="material-symbols-outlined">share</span>
            <span>Share</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button
                className="w-full h-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    window.location.origin + postLink
                  );
                  setShareOpened(false);
                  toast({ title: "Link Copied to Clipboard!" });
                }}
              >
                Copy Link
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary hover:text-black">
          <span className="material-symbols-outlined">bookmark</span>
          <span>Save</span>
        </div>

        {user && user.username === usernameOfPost && (
          <Dialog open={isDialogOpen}>
            <DialogTrigger onClick={openDialog}>
              <div className="flex items-center gap-1 p-1 rounded cursor-pointer hover:text-black hover:bg-secondary">
                <span className="material-symbols-outlined">edit</span>
                <span>Edit</span>
              </div>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl md:w-3/4"
              handleClose={closeDialog}
            >
              {postBody && postTitle && (
                <EditPost
                  closeDialog={closeDialog}
                  postTitle={postTitle}
                  postBody={postBody}
                  postID={postID}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default PostInteraction;
