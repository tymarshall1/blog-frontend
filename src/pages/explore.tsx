import Loading from "@/components/ui/loading";
import { MoreInformation } from "@/components/ui/moreInformation";
import useFetch from "@/hooks/useFetch";
import { Comment } from "@/types/comment";
import { Community } from "@/types/community";
import { UserPost } from "@/types/post";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { timeSince } from "@/lib/utils";
function ExploreCommunity({ icon, name }: { icon: string; name: string }) {
  return (
    <Link
      className="flex items-center gap-2 p-1 border-[1px] border-transparent rounded-lg hover:border-secondary"
      to={`/community/${name}`}
    >
      <img
        src={icon}
        className="border-2 rounded-full w-9 h-9 border-white/20"
        alt={name + " icon"}
      />
      <h3 className="text-xl font-normal text-white">{name}</h3>
    </Link>
  );
}

function ExplorePost({
  icon,
  username,
  title,
  timeStamp,
  postId,
  postCommunity,
}: {
  icon: string;
  username: string;
  title: string;
  timeStamp: string;
  postId: string;
  postCommunity: string;
}) {
  return (
    <Link
      className="flex items-center gap-2 p-1 border-[1px] border-transparent rounded-lg hover:border-secondary"
      to={`/community/${postCommunity}/${title}/${postId}`}
    >
      <div className="flex gap-2">
        <div className="flex flex-col gap-1 md:min-w-48 min-w-28 md:items-center md:flex-row">
          <Link
            to={`/user/${username}`}
            className="flex items-center gap-1 hover:text-secondary"
          >
            <img
              className="border-2 rounded-full w-9 h-9 border-white/20"
              src={icon}
              alt={username + "'s  icon"}
            />
            <h4 className="text-lg font-normal text-white hover:text-secondary">
              {username}
            </h4>
          </Link>
          <p className="text-sm text-white/20">posted {timeSince(timeStamp)}</p>
        </div>

        <h3 className="text-2xl font-semibold text-white ">{title}</h3>
      </div>
    </Link>
  );
}

function ExploreComment({
  icon,
  username,
  postTitle,
  timeStamp,
  postId,
  postCommunity,
  comment,
}: {
  icon: string;
  username: string;
  postTitle: string;
  timeStamp: string;
  postId: string;
  postCommunity: string;
  comment: string;
}) {
  return (
    <Link
      className="flex items-center gap-2 p-1 border-[1px] border-transparent rounded-lg hover:border-secondary"
      to={`/community/${postCommunity}/${postTitle}/${postId}`}
    >
      <div className="flex gap-2">
        <div className="flex flex-col gap-1 md:min-w-56 min-w-28 md:items-center md:flex-row">
          <Link
            to={`/user/${username}`}
            className="flex items-center gap-1 hover:text-secondary"
          >
            <img
              className="border-2 rounded-full w-9 h-9 border-white/20"
              src={icon}
              alt={username + "'s  icon"}
            />
            <h4 className="text-lg font-normal text-white hover:text-secondary">
              {username}
            </h4>
          </Link>

          <p className="text-sm text-white/20">
            commented {timeSince(timeStamp)}
          </p>
        </div>

        <h3
          dangerouslySetInnerHTML={{ __html: comment }}
          className="px-2 max-w-4xl overflow-hidden prose text-white break-words prose-blockquote:border-l-[#1f2937] max-h-48 prose-pre:break-all md:prose-pre:break-words prose-pre:whitespace-pre-wrap prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-black "
        ></h3>
      </div>
    </Link>
  );
}

function ExploreSection({
  sectionTitle,
  sectionIcon,
  exploreData,
}: {
  sectionTitle: string;
  sectionIcon: ReactNode;
  exploreData: ReactNode;
}) {
  return (
    <div className="py-2">
      <div>
        <h2 className="flex items-center gap-2 px-2 py-3 text-3xl font-bold text-white border-2 rounded bg-sideNav border-white/20">
          {sectionTitle}
          {sectionIcon}
        </h2>
        <div className="px-4 py-2">{exploreData}</div>
      </div>
    </div>
  );
}

function Explore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const { isLoading, error, responseData, fetchData } =
    useFetch<ExploreResults>(
      `${
        import.meta.env.VITE_LIMELEAF_BACKEND_URL
      }/api/explore?search=${searchValue}`,
      "GET"
    );
  const [results, setResults] = useState({
    hasComments: responseData?.comments && responseData?.comments.length > 0,
    hasPosts: responseData?.posts && responseData?.posts.length > 0,
    hasCommunities:
      responseData?.communities && responseData?.communities.length > 0,
  });

  type ExploreResults = {
    communities: Community[];
    posts: UserPost[];
    comments: Comment[];
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    setResults({
      hasComments: responseData?.comments && responseData?.comments.length > 0,
      hasPosts: responseData?.posts && responseData?.posts.length > 0,
      hasCommunities:
        responseData?.communities && responseData?.communities.length > 0,
    });
  }, [responseData]);

  return (
    <div className="flex gap-2 p-2">
      <div className="flex-1">
        <div className="relative mb-8 border-[1px] rounded border-white/20">
          <img
            className="w-full rounded max-h-72 min-h-40"
            src="https://res.cloudinary.com/de7we6c9g/image/upload/f_auto,q_auto/v1/Community%20Backgrounds/explorePage"
            alt="space background image"
          />
          <h1 className="absolute text-2xl font-black text-white text-shadow sm:text-3xl md:text-5xl top-1/3 left-2">
            Results For:{" "}
            <span className="capitalize text-secondary">{searchValue}</span>
          </h1>
        </div>

        {isLoading && <Loading />}
        {error && (
          <p className="text-white">An error has occurred, try again later.</p>
        )}
        {!isLoading && !error && (
          <>
            {!results.hasComments &&
              !results.hasCommunities &&
              !results.hasPosts && (
                <div className="p-2 border-2 rounded bg-sideNav border-white/20">
                  <h1 className="text-2xl font-bold text-white">
                    No Results Found
                  </h1>
                </div>
              )}
            {results.hasCommunities && (
              <ExploreSection
                exploreData={responseData?.communities.map((community) => {
                  return (
                    <ExploreCommunity
                      key={community.name}
                      icon={community.communityIcon.toString()}
                      name={community.name}
                    />
                  );
                })}
                sectionTitle={"Communities"}
                sectionIcon={
                  <span className="text-4xl text-secondary material-symbols-outlined">
                    diversity_3
                  </span>
                }
              />
            )}
            {results.hasPosts && (
              <ExploreSection
                sectionTitle={"Posts"}
                sectionIcon={
                  <span className="text-4xl text-secondary material-symbols-outlined">
                    forum
                  </span>
                }
                exploreData={responseData?.posts.map((post) => {
                  return (
                    <ExplorePost
                      key={post._id}
                      icon={post.author.profileImg.toString()}
                      username={post.author.account.username}
                      title={post.title}
                      timeStamp={post.created}
                      postId={post._id}
                      postCommunity={post.community.name}
                    />
                  );
                })}
              />
            )}
            {results.hasComments && (
              <ExploreSection
                sectionTitle={"Comments"}
                sectionIcon={
                  <span className="text-4xl material-symbols-outlined text-secondary">
                    chat
                  </span>
                }
                exploreData={responseData?.comments.map((comment, index) => {
                  return (
                    <ExploreComment
                      key={index}
                      icon={comment.profile.profileImg.toString()}
                      username={comment.profile.account?.username || "error"}
                      postTitle={comment.post.title}
                      timeStamp={comment.created}
                      postId={comment.post._id}
                      postCommunity={comment.post.community.name}
                      comment={comment.comment}
                    />
                  );
                })}
              />
            )}
          </>
        )}
      </div>
      <MoreInformation className="mt-0" defaultInformation={true}>
        <></>
      </MoreInformation>
    </div>
  );
}

export default Explore;
