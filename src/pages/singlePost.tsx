import { UserPost } from "@/types/post";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MoreInformation from "@/components/ui/moreInformation";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";
import TextArea from "@/forms/components/textArea";
import { Button } from "@/components/ui/button";
import PostEditor from "@/forms/components/postEditor";

type CommunitySectionProps = {
  title: string;
  data: string | number | string[] | React.ReactNode;
};

function CommunitySection(props: CommunitySectionProps) {
  return (
    <div className="px-2 pt-2 space-y-1 ">
      <h2 className="text-lg font-black text-secondary">{props.title}</h2>
      <div className="pb-2 tracking-wider border-b-[1px] border-white">
        {props.data}
      </div>
    </div>
  );
}

type PostHeaderProps = {
  communityIcon: string;
  communityName: string;
  username: string;
  creationTime: string;
};

function PostHeader(props: PostHeaderProps) {
  return (
    <section className="flex items-center gap-2 mx-4 mt-2">
      <img
        src={props.communityIcon}
        className="w-12 h-12 rounded-full"
        alt="community icon"
      />
      <div className="text-white">
        <div className="flex items-center gap-2">
          <Link
            className="text-lg font-medium hover:text-secondary"
            to={`/community/${props.communityName}`}
          >
            {props.communityName}
          </Link>

          <p className="text-sm font-light text-white/50">
            {props.creationTime}
          </p>
        </div>
        <Link
          className="text-sm font-normal tracking-wide hover:text-secondary"
          to={`/user/${props.username}`}
        >
          {props.username}
        </Link>
      </div>
    </section>
  );
}

type PostBodyProps = {
  title: string;
  body: string;
  likes: number;
  dislikes: number;
};

function PostBody(props: PostBodyProps) {
  return (
    <section className="px-4 space-y-4 ">
      <h1 className="max-w-4xl py-1 overflow-hidden text-4xl font-bold text-white break-words break-all">
        {props.title}
      </h1>
      <div className="max-w-4xl p-3 bg-white border-2 rounded border-secondary">
        <div
          dangerouslySetInnerHTML={{ __html: props.body }}
          className="max-w-4xl overflow-hidden prose text-black break-words break-all prose-pre:max-w-sm prose-li:p-0 prose-li:m-0 prose-h1:text-lg prose-h1:m-0 prose-p:m-0 prose-p:p-0 prose-p:font-light prose-p:tracking-wide pose-h1:p-0 prose-ul:list-disc prose-li:marker:text-black"
        ></div>

        <div className="flex mt-4">
          <div
            onClick={() => {
              console.log("like button click");
            }}
            className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
          >
            <span className="material-symbols-outlined">thumb_up</span>
            <span>{props.likes}</span>
          </div>
          <div
            onClick={() => {
              console.log("dislike button click");
            }}
            className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-secondary"
          >
            <span className="material-symbols-outlined">thumb_down</span>
            <span>{props.dislikes}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SinglePost() {
  const { communityName, post, id } = useParams();
  const [userPost, setUserPost] = useState<UserPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [textAreaClick, setTextAreaClick] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          throw new Error("Server error");
        }
        setUserPost(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [communityName, post]);

  return (
    <div className="flex">
      {loading && <Loading />}
      {error && (
        <div className="flex gap-5">
          <h1 className="flex-1 block p-4 mx-auto text-4xl font-bold text-white">
            Server error, try again later.
          </h1>
          <MoreInformation defaultInformation={true}>
            <></>
          </MoreInformation>
        </div>
      )}
      {userPost && (
        <>
          <div className="flex-1">
            <div className="space-y-5 ">
              <PostHeader
                communityIcon={userPost.community.communityIcon.toString()}
                communityName={userPost.community.name}
                username={userPost.author.account.username}
                creationTime={userPost.created}
              />
              <PostBody
                title={userPost.title}
                body={userPost.body}
                likes={userPost.likes.length}
                dislikes={userPost.dislikes.length}
              />
              <form action="" className="max-w-2xl mx-4">
                {!textAreaClick && (
                  <TextArea
                    className={`${
                      textAreaClick ? "hidden" : "rounded-full"
                    } px-2 `}
                    label={"Comment"}
                    id={"comment"}
                    onClick={() => setTextAreaClick(true)}
                    error={false}
                  />
                )}

                {textAreaClick && (
                  <>
                    <label
                      className="text-xl font-medium text-white"
                      htmlFor={"comment"}
                    >
                      Comment
                    </label>
                    <div className="bg-white rounded ">
                      <PostEditor
                        className="min-h-20"
                        setBody={function (body: string): void {
                          throw new Error("Function not implemented.");
                        }}
                        id={"comment"}
                      />
                    </div>
                    <div className="flex justify-end gap-2 my-2 ">
                      <Button
                        onClick={() => setTextAreaClick(false)}
                        type="button"
                        variant={"destructive"}
                      >
                        Cancel
                      </Button>
                      <Button type="button">Submit</Button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          <div className="hidden mx-10 lg:block">
            <MoreInformation defaultInformation={error}>
              <>
                <div className="px-2 pt-2">
                  <Link to={`/community/${userPost.community.name}`}>
                    <h3 className="mb-2 text-4xl font-black text-center text-secondary hover:opacity-80">
                      {userPost.community.name}
                    </h3>
                  </Link>

                  <p className="pb-2 border-b-[1px] border-white">
                    {userPost.community.description}
                  </p>
                </div>
                <CommunitySection
                  title={"Followers"}
                  data={userPost.community.followers}
                />
                <CommunitySection
                  title={"Tags"}
                  data={
                    typeof userPost.community.tags === "object" && (
                      <div className="flex flex-wrap gap-2">
                        {userPost.community.tags.map((tags: string) => (
                          <Badge key={tags}>{tags}</Badge>
                        ))}
                      </div>
                    )
                  }
                />
                <CommunitySection
                  title={"Created"}
                  data={userPost.community.created}
                />
              </>
            </MoreInformation>
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePost;
