import { useEffect, useState } from "react";
import Loading from "./loading";
import Post from "./post";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserPost } from "@/types/post";

function PostFeed({ filter = "home" }: { filter?: string }) {
  const [posts, setPosts] = useState<UserPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts?filter=${filter}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="flex-1 p-4 space-y-4 lg:flex-[0]">
        {loading && <Loading />}
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
                reactionScore={
                  user?.profile?.likedPosts.includes(post._id)
                    ? 1
                    : user?.profile?.dislikedPosts.includes(post._id)
                    ? -1
                    : 0
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default PostFeed;
