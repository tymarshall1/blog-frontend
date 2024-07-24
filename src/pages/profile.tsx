import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { AccountData } from "@/types/accountData";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useAuthContext } from "@/hooks/useAuthContext";
import { MoreInformation } from "../components/ui/moreInformation";
import ProfileForm from "@/forms/profile";
import { useNavigate } from "react-router-dom";
import { UserPost } from "../types/post";
import { Comment } from "@/types/comment";
import { timeSince } from "@/lib/utils";
import PostInteraction from "@/components/ui/postInteraction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

enum ProfileFilterOptions {
  Overview = "overview",
  Posts = "posts",
  Comments = "comments",
  Profile = "profile",
}

function AccountFilter({
  isMyAccount,
  lastClicked,
  setLastClicked,
}: {
  isMyAccount: boolean;
  lastClicked: string;
  setLastClicked: React.Dispatch<React.SetStateAction<ProfileFilterOptions>>;
}) {
  const handleClick = (lastLinkSelected: ProfileFilterOptions) => {
    setLastClicked(lastLinkSelected);
  };
  return (
    <>
      <div className="flex-wrap items-center justify-center hidden gap-4 sm:flex">
        <Button
          onClick={() => handleClick(ProfileFilterOptions.Overview)}
          className={`${
            lastClicked === ProfileFilterOptions.Overview ? " bg-black " : ""
          } font-bold bg-none text-md rounded-none rounded-t-lg`}
          variant={"link"}
        >
          Overview
        </Button>
        <Button
          onClick={() => handleClick(ProfileFilterOptions.Posts)}
          className={`${
            lastClicked === ProfileFilterOptions.Posts ? "bg-black" : ""
          } font-bold bg-none text-md rounded-none rounded-t-lg`}
          variant={"link"}
        >
          Posts
        </Button>
        <Button
          onClick={() => handleClick(ProfileFilterOptions.Comments)}
          className={`${
            lastClicked === ProfileFilterOptions.Comments ? "bg-black" : ""
          } font-bold bg-none text-md rounded-none  rounded-t-lg`}
          variant={"link"}
        >
          Comments
        </Button>
        {isMyAccount && (
          <Button
            onClick={() => handleClick(ProfileFilterOptions.Profile)}
            className={`${
              lastClicked === ProfileFilterOptions.Profile ? "bg-black" : ""
            } font-bold bg-none text-md rounded-none  rounded-t-lg`}
            variant={"link"}
          >
            Profile
          </Button>
        )}
      </div>

      <div className="text-right sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full hover:bg-white/50 ">
            <span className="text-3xl rotate-90 material-symbols-outlined text-secondary">
              more_vert
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button
                onClick={() => handleClick(ProfileFilterOptions.Overview)}
                className={`${
                  lastClicked === ProfileFilterOptions.Overview
                    ? " bg-black text-white"
                    : "text-black"
                } font-bold bg-none text-md w-full rounded-none rounded-t-lg `}
                variant={"link"}
              >
                Overview
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => handleClick(ProfileFilterOptions.Posts)}
                className={`${
                  lastClicked === ProfileFilterOptions.Posts
                    ? "bg-black text-white"
                    : "text-black"
                } font-bold bg-none text-md w-full rounded-none rounded-t-lg`}
                variant={"link"}
              >
                Posts
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => handleClick(ProfileFilterOptions.Comments)}
                className={`${
                  lastClicked === ProfileFilterOptions.Comments
                    ? "bg-black text-white"
                    : "text-black"
                } font-bold bg-none text-md w-full rounded-none  rounded-t-lg`}
                variant={"link"}
              >
                Comments
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isMyAccount && (
                <Button
                  onClick={() => handleClick(ProfileFilterOptions.Profile)}
                  className={`${
                    lastClicked === ProfileFilterOptions.Profile
                      ? "bg-black text-white"
                      : "text-black"
                  } font-bold bg-none text-md  w-full rounded-none  rounded-t-lg`}
                  variant={"link"}
                >
                  Profile
                </Button>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

function ProfileHeader({
  accountTitle,
  isMyAccount,
  lastClicked,
  setLastClicked,
  bio,
  profileImg,
}: {
  accountTitle: string;
  isMyAccount: boolean;
  lastClicked: string;
  setLastClicked: React.Dispatch<React.SetStateAction<ProfileFilterOptions>>;
  bio: string;
  profileImg: string | undefined;
}) {
  return (
    <div className="px-4 pt-4 mt-4 space-y-10 rounded bg-gradient-to-r from-sideNav to-moreInformation border-[1px] border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <img
          className="bg-transparent rounded-full w-14 h-14 border-[1px] border-white/20"
          src={profileImg}
          alt="profile image"
        />
        <h1 className="text-2xl font-bold text-white">{accountTitle}</h1>
      </div>
      <p className="max-w-lg overflow-hidden text-sm font-medium text-white break-words max-h-40 ">
        {bio}
      </p>
      <AccountFilter
        isMyAccount={isMyAccount}
        lastClicked={lastClicked}
        setLastClicked={setLastClicked}
      />
    </div>
  );
}

type ProfileSectionProps = {
  title: string;
  data: string;
};

function ProfileSection(props: ProfileSectionProps) {
  return (
    <div className="p-2 space-y-1">
      <h2 className="text-lg font-black text-secondary">{props.title}</h2>
      <p className="pb-2 tracking-wider border-b-[1px] border-white border-secondary">
        {props.data}
      </p>
    </div>
  );
}

type SectionDividerProps = {
  communityName: string;
  communityIcon: string;
  title: string;
  created: string;
  username: string;
  postName: string;
  postID: string;
  isPost: boolean;
  postBody?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  reactionScore?: number;
};

function SectionDivider({
  communityName,
  communityIcon,
  title,
  created,
  username,
  postName,
  postID,
  isPost,
  postBody,
  comments,
  dislikes,
  likes,
  reactionScore = 0,
}: SectionDividerProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isPost ? "max-h-[25rem]" : "max-h-56"
      } border-y-[1px] border-secondary overflow-hidden  p-2`}
    >
      <div className="pt-2 mb-3">
        <Link
          onClick={(e) => e.stopPropagation()}
          className="text-lg font-bold text-white hover:text-secondary"
          to={`/community/${communityName}`}
        >
          <img
            className="inline-block w-8 h-8 mr-2 rounded-full"
            src={communityIcon}
            alt="community Icon"
          />
          {communityName}
        </Link>
      </div>
      <h2 className="mb-2 font-medium text-white">
        {username}
        <span className="text-sm font-normal text-white/60">{` ${
          isPost ? "posted" : "commented"
        } ${timeSince(created)}`}</span>
      </h2>
      <div
        onClick={() =>
          navigate(`/community/${communityName}/${postName}/${postID}`)
        }
        className="p-2 rounded hover:bg-gray-600 hover:cursor-pointer"
      >
        <p
          className={`${
            isPost ? "text-2xl" : "text-lg"
          } max-w-4xl mb-3 overflow-hidden font-bold prose max-h-12 break-all  prose-strong:text-white text-white break-words prose-blockquote:text-white prose-pre:whitespace-pre-wrap prose-h1:text-white prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-white`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        {postBody && (
          <p
            className="max-w-4xl mb-3 overflow-hidden font-normal prose text-white break-words prose-pre:break-all max-h-40 prose-strong:text-white prose-blockquote:text-white prose-pre:whitespace-pre-wrap prose-h1:text-white prose-pre:max-w-lg prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-white"
            dangerouslySetInnerHTML={{ __html: postBody }}
          ></p>
        )}
      </div>
      {isPost && (
        <PostInteraction
          likes={likes || 0}
          dislikes={dislikes || 0}
          comments={comments || 0}
          postID={postID}
          postLink={`/community/${communityName}/${postName}/${postID}`}
          className=""
          reactionScore={reactionScore}
        />
      )}
    </div>
  );
}

function Comments({
  comments,
  username,
}: {
  comments: Comment[];
  username: string;
}) {
  return (
    <div>
      {comments.length === 0 && (
        <p className="text-xl font-semibold text-center text-white">
          {`${username} has not posted a comment yet!`}
        </p>
      )}
      {comments.map((comment, index) => {
        return (
          <SectionDivider
            key={index}
            communityName={comment.post.community.name}
            communityIcon={comment.post.community.communityIcon.toString()}
            title={comment.comment}
            created={comment.created}
            username={username}
            postName={comment.post.title}
            postID={comment.post._id}
            isPost={false}
          />
        );
      })}
    </div>
  );
}

function Posts({ posts, username }: { posts: UserPost[]; username: string }) {
  return (
    <div>
      {posts.length === 0 && (
        <p className="text-xl font-semibold text-center text-white">
          {`${username} has not created a post yet!`}
        </p>
      )}
      {posts.map((post, index) => {
        return (
          <SectionDivider
            key={index}
            communityName={post.community.name}
            communityIcon={post.community.communityIcon.toString()}
            title={post.title}
            created={post.created}
            username={username}
            postName={post.title}
            postID={post._id}
            isPost={true}
            postBody={post.body}
            likes={post.likes}
            dislikes={post.dislikes}
            reactionScore={post.reactionScore}
            comments={typeof post.comments === "number" ? post.comments : 0}
          />
        );
      })}
    </div>
  );
}

function Overview({
  comments,
  posts,
  username,
}: {
  posts: UserPost[];
  comments: Comment[];
  username: string;
}) {
  const combinedPostsAndComments = [...posts, ...comments];
  const sortedByDate = combinedPostsAndComments.sort(dateSort);

  function dateSort(a: { created: string }, b: { created: string }) {
    if (new Date(a.created) > new Date(b.created)) {
      return -1;
    } else return 1;
  }

  return (
    <div>
      {sortedByDate.length === 0 && (
        <p className="text-xl font-semibold text-center text-white">
          {`${username} has not created a post or comment yet!`}
        </p>
      )}
      {sortedByDate.map((element: Comment | UserPost, index) => {
        if ("comment" in element) {
          return (
            <SectionDivider
              key={index}
              communityName={element.post.community.name}
              communityIcon={element.post.community.communityIcon.toString()}
              title={element.comment}
              created={element.created}
              username={username}
              postName={element.post.title}
              postID={element.post._id}
              isPost={false}
            />
          );
        } else {
          return (
            <SectionDivider
              key={index}
              communityName={element.community.name}
              communityIcon={element.community.communityIcon.toString()}
              title={element.title}
              created={element.created}
              username={username}
              postName={element.title}
              postID={element._id}
              isPost={true}
              postBody={element.body}
              likes={element.likes}
              reactionScore={element.reactionScore}
              dislikes={element.dislikes}
              comments={
                typeof element.comments === "number" ? element.comments : 0
              }
            />
          );
        }
      })}
    </div>
  );
}

function Profile() {
  const { username } = useParams();
  const { user } = useAuthContext();
  const [lastClicked, setLastClicked] = useState<ProfileFilterOptions>(
    ProfileFilterOptions.Overview
  );
  const { isLoading, error, responseData, fetchData } = useFetch<AccountData>(
    `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/user/profile/${username}`,
    "GET"
  );
  const isMyAccount =
    user?.username?.toLocaleLowerCase() === username?.toLocaleLowerCase();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [username]);

  return (
    <div className="flex gap-4 m-2">
      <div className="flex-1 ">
        {isLoading && <Loading />}
        {error && (
          <>
            {error === 404 && (
              <div>
                <Error />
              </div>
            )}
            {error === 500 && "Internal server error, try again later"}
          </>
        )}
        {!error && !isLoading && (
          <div className="h-full space-y-4">
            <ProfileHeader
              accountTitle={
                responseData?.username ? responseData.username : "none"
              }
              isMyAccount={isMyAccount}
              lastClicked={lastClicked}
              setLastClicked={setLastClicked}
              bio={
                isMyAccount
                  ? user?.profile?.biography || ""
                  : responseData?.profile?.biography || ""
              }
              profileImg={
                (isMyAccount && user?.profile?.profileImg.toString()) ||
                responseData?.profile?.profileImg.toString()
              }
            />
            <div className=" border-[1px] rounded border-sideNav p-4">
              {lastClicked === ProfileFilterOptions.Overview && (
                <Overview
                  comments={
                    responseData?.profile?.comments
                      ? responseData?.profile?.comments
                      : []
                  }
                  posts={
                    responseData?.profile?.posts
                      ? responseData?.profile?.posts
                      : []
                  }
                  username={
                    responseData?.username
                      ? responseData?.username
                      : "undefined"
                  }
                />
              )}
              {lastClicked === ProfileFilterOptions.Posts && (
                <Posts
                  posts={
                    responseData?.profile?.posts
                      ? responseData?.profile?.posts
                      : []
                  }
                  username={
                    responseData?.username
                      ? responseData?.username
                      : "undefined"
                  }
                />
              )}
              {lastClicked === ProfileFilterOptions.Comments && (
                <Comments
                  comments={
                    responseData?.profile?.comments
                      ? responseData?.profile?.comments
                      : []
                  }
                  username={
                    responseData?.username
                      ? responseData?.username
                      : "undefined"
                  }
                />
              )}
              {lastClicked === ProfileFilterOptions.Profile && <ProfileForm />}
            </div>
          </div>
        )}
      </div>
      <MoreInformation defaultInformation={error ? true : false}>
        <>
          {isLoading && <Loading />}
          {!error && !isLoading && (
            <div className="flex flex-col">
              <img
                className="border-[1px] border-white/20 self-center w-20 h-20 bg-transparent rounded-full"
                src={
                  isMyAccount
                    ? user?.profile?.profileImg.toString()
                    : responseData?.profile?.profileImg.toString()
                }
                alt="profile image"
              />
              <ProfileSection
                title={"Username"}
                data={responseData?.username || "error"}
              />
              <ProfileSection
                title={"First Name"}
                data={
                  isMyAccount
                    ? user?.profile?.firstName || "Error"
                    : responseData?.profile?.firstName || "Error"
                }
              />
              <ProfileSection
                title={"Last Name"}
                data={
                  isMyAccount
                    ? user?.profile?.lastName || "Error"
                    : responseData?.profile?.lastName || "error"
                }
              />
              <ProfileSection
                title={"Posts"}
                data={responseData?.profile?.posts.length || "0"}
              />
              <ProfileSection
                title={"Comments"}
                data={responseData?.profile?.comments.length || "0"}
              />
              <ProfileSection
                title={"Joined"}
                data={responseData?.accountCreated || "error"}
              />
            </div>
          )}
        </>
      </MoreInformation>
    </div>
  );
}

export default Profile;
