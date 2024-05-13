import { useEffect, useState } from "react";
import Post from "../components/ui/post";
import MoreInformation from "@/components/ui/moreInformation";
import { UserPost } from "@/types/post";

function Home() {
  const [posts, setPosts] = useState<UserPost[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  console.log(posts);

  return (
    <div className="flex justify-center ">
      <div className="flex-1 p-4 space-y-4 lg:flex-[0] ">
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
                likes={post.likes.length}
                dislikes={post.dislikes.length}
                comments={post.comments.length}
                id={post._id}
                communityIcon={post.community.communityIcon}
              />
            ))}
          </>
        )}
      </div>
      <MoreInformation defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Home;
