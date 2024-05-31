import { Link } from "react-router-dom";
import { Button } from "./button";
import { useState } from "react";
import PostInteraction from "./postInteraction";
import { timeSince } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
export type CommunityPagePostProps = {
  profileImg: string;
  username: string;
  created: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  comments: number;
  id: string;
  communityName: string;
};

function CommunityPagePost(props: CommunityPagePostProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <div
      onClick={() =>
        navigate(`/community/${props.communityName}/${props.title}/${props.id}`)
      }
      className="max-w-4xl p-2 mx-auto overflow-hidden text-black border-2 border-transparent rounded cursor-pointer bg-zinc-300 hover:border-secondary max-h-96"
    >
      <Link
        onClick={(e) => e.stopPropagation()}
        className="space-x-2 hover:text-secondary"
        to={`/user/${props.username}`}
      >
        <img
          className="inline-block w-10 h-10 rounded-full"
          src={props.profileImg}
          alt={`${props.username}'s icon`}
        />
        <p className="inline-block ">{props.username}</p>
      </Link>
      <span className="text-sm text-black/50"> {timeSince(props.created)}</span>
      <h2 className="mt-3 mb-2 text-2xl font-semibold break-words">
        {props.title}
      </h2>
      <p
        className="max-w-4xl overflow-hidden prose text-black break-words prose-blockquote:border-l-[#1f2937] max-h-48 prose-pre:break-all md:prose-pre:break-words prose-pre:whitespace-pre-wrap prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-black"
        dangerouslySetInnerHTML={{ __html: props.body }}
      ></p>
      <PostInteraction
        likes={props.likes}
        dislikes={props.dislikes}
        comments={props.comments}
        postID={props.id}
        reactionScore={
          user?.profile?.likedPosts.includes(props.id)
            ? 1
            : user?.profile?.dislikedPosts.includes(props.id)
            ? -1
            : 0
        }
      />
    </div>
  );
}

function NoPostsYet() {
  return (
    <div className="space-y-2 text-xl font-bold text-center">
      <p>There have been no posts made yet!</p>
      <p>you could be the first.</p>
      <Link
        className="block px-2 py-1 mx-auto text-xl font-black rounded max-w-20 text-foreground bg-secondary hover:bg-white/80"
        to={"/create-post"}
      >
        Create
      </Link>
    </div>
  );
}

enum Filters {
  HOT = "Hot",
  POPULAR = "Popular",
  NEW = "New",
}

function SortedFeed({
  posts,
  communityName,
  typeOfSort,
}: {
  posts: CommunityPagePostProps[] | undefined;
  communityName: string;
  typeOfSort: Filters;
}) {
  function hotnessScore(post: CommunityPagePostProps) {
    const { likes, dislikes, comments, created } = post;
    const score = likes + comments * 2 - dislikes;
    const ageInHours = (Date.now() - new Date(created).getTime()) / 3600000;
    return score / Math.pow(ageInHours + 2, 1.5);
  }

  let sortedPosts;
  if (posts) {
    sortedPosts = [...posts];
    //posts already come sorted by newness
    //so don't need to check here
    if (typeOfSort === Filters.HOT) {
      sortedPosts.sort((a, b) => hotnessScore(b) - hotnessScore(a));
    }
    if (typeOfSort === Filters.POPULAR) {
      sortedPosts.sort((a, b) => {
        const aScore = a.likes + a.comments - a.dislikes;
        const bScore = b.likes + b.comments - b.dislikes;
        return bScore - aScore;
      });
    }
  }
  return (
    <div className="space-y-4">
      {sortedPosts &&
        sortedPosts.map((post) => (
          <CommunityPagePost
            profileImg={post.profileImg.toString()}
            username={post.username}
            created={post.created}
            title={post.title}
            body={post.body}
            likes={post.likes}
            dislikes={post.dislikes}
            comments={post.comments}
            id={post.id}
            communityName={communityName}
            key={post.id}
          />
        ))}
      {!sortedPosts || (sortedPosts.length === 0 && <NoPostsYet />)}
    </div>
  );
}

export function PostFilter({
  posts,
  communityName,
}: {
  posts: CommunityPagePostProps[] | undefined;
  communityName: string;
}) {
  const [selected, setSelected] = useState<Filters>(Filters.HOT);

  return (
    <div className="pb-4 space-y-4">
      <div className="flex items-center justify-center gap-4 rounded-full bg-moreInformation">
        <Button
          onClick={() => setSelected(Filters.HOT)}
          className={`${
            selected === Filters.HOT
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">
            local_fire_department
          </span>
          {Filters.HOT}
        </Button>
        <Button
          onClick={() => setSelected(Filters.POPULAR)}
          className={`${
            selected === Filters.POPULAR
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">data_thresholding</span>
          {Filters.POPULAR}
        </Button>
        <Button
          onClick={() => setSelected(Filters.NEW)}
          className={`${
            selected === Filters.NEW
              ? "bg-secondary text-black hover:bg-secondary"
              : ""
          }`}
          variant={"ghost"}
        >
          <span className="material-symbols-outlined">rocket_launch</span>
          {Filters.NEW}
        </Button>
      </div>
      {selected === Filters.HOT && (
        <SortedFeed
          posts={posts}
          communityName={communityName}
          typeOfSort={Filters.HOT}
        />
      )}
      {selected === Filters.POPULAR && (
        <SortedFeed
          posts={posts}
          communityName={communityName}
          typeOfSort={Filters.POPULAR}
        />
      )}
      {selected === Filters.NEW && (
        <SortedFeed
          posts={posts}
          communityName={communityName}
          typeOfSort={Filters.NEW}
        />
      )}
    </div>
  );
}
