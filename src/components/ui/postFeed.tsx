import { useEffect, useState } from "react";
import Post from "./post";
import { UserPost } from "@/types/post";
import { Skeleton } from "./skeleton";

function SkeletonPost() {
  return (
    <Skeleton className="flex flex-col w-full gap-5 p-2 bg-transparent border-2 rounded h-60 border-neutral-600">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full bg-neutral-600"></Skeleton>
        <Skeleton className="w-20 h-5 bg-neutral-600"></Skeleton>
        <Skeleton className="w-32 h-3 bg-neutral-600"></Skeleton>
      </div>

      <Skeleton className="w-1/2 h-10 bg-neutral-600"></Skeleton>
      <Skeleton className="w-full h-full bg-neutral-600"></Skeleton>
    </Skeleton>
  );
}

function PostFeed({ filter = "home" }: { filter?: string }) {
  const [posts, setPosts] = useState<UserPost[] | null>(null);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : "undefined";

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts?filter=${filter}`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-[49rem]">
      <div className="flex-1 p-4 space-y-4 lg:flex-[0]">
        {loading && (
          <div className="w-full space-y-3">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        )}
        {posts && (
          <>
            {posts.map((post) => (
              <Post
                key={post._id}
                community={post.community.name}
                user={post.author.account.username}
                timeCreated={post.created}
                title={post.title}
                body={post.body}
                likes={post.likes}
                dislikes={post.dislikes}
                comments={
                  typeof post.comments === "object"
                    ? post.comments.length
                    : post.comments
                }
                id={post._id}
                communityIcon={post.community.communityIcon.toString()}
                reactionScore={post.reactionScore}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default PostFeed;
