import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Community } from "@/types/community";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { MoreInformation } from "@/components/ui/moreInformation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostFilter } from "@/components/ui/postFilter";
import { useToggleFollow } from "@/hooks/useToggleFollow";

type CommunityHeaderProps = {
  communityName: string;
  communityDescription: string;
  communityIcon: string;
  currentlyFollows: boolean;
  follows: boolean;
  communityBG: string;
  toggleFollowedCommunity: () => void;
};

function CommunityHeader({
  communityName,
  communityDescription,
  communityIcon,
  communityBG,
  follows,
  toggleFollowedCommunity,
}: CommunityHeaderProps) {
  return (
    <>
      <div
        style={{ backgroundImage: `url('${communityBG}')` }}
        className="p-4 mt-4 bg-center bg-no-repeat bg-cover border-[1px] rounded h-60 border-white/20"
      ></div>
      <div className="flex flex-col gap-2 p-2 mt-4 min-[1080px]:hidden">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <img
              className="w-16 h-16 border-2 rounded-full border-white/20"
              src={communityIcon}
              alt=""
            />
            <h1 className="text-3xl font-black">{communityName}</h1>
          </div>

          <Button
            variant={"secondary"}
            className="h-8"
            onClick={toggleFollowedCommunity}
          >
            {follows ? "Unfollow" : "Follow"}
          </Button>
        </div>

        <p className="max-w-lg overflow-hidden font-thin tracking-wider text-white break-words text-md max-h-40 ">
          {communityDescription}
        </p>
      </div>
    </>
  );
}
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

function CommunityPage() {
  const { communityName } = useParams();
  const [follows, setFollows] = useState(false);
  const { isLoading, error, responseData, fetchData } = useFetch<Community>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/community/${communityName}/`,
    "GET"
  );
  const { fetchError, toggleFollow } = useToggleFollow();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [communityName]);

  useEffect(() => {
    if (responseData) {
      setFollows(responseData.followsCommunity || false);
    }
  }, [responseData]);

  async function toggleFollowedCommunity() {
    await toggleFollow(communityName);
    setFollows(follows ? false : true);
  }

  return (
    <div className="text-white ">
      {isLoading && <Loading />}
      {error === 404 ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <Error />
          </div>

          <MoreInformation defaultInformation={true}>
            <></>
          </MoreInformation>
        </div>
      ) : (
        <>
          {responseData && (
            <div className="flex gap-4 ml-4 xl:ml-0 lg:p-2">
              <div className="flex-1 space-y-4">
                <CommunityHeader
                  communityName={responseData.name}
                  communityDescription={responseData.description}
                  communityIcon={responseData.communityIcon.toString()}
                  communityBG={responseData.communityBG.toString()}
                  currentlyFollows={false}
                  follows={follows}
                  toggleFollowedCommunity={toggleFollowedCommunity}
                />
                <PostFilter
                  posts={
                    "posts" in responseData ? responseData.posts : undefined
                  }
                  communityName={responseData.name}
                />
              </div>

              <div>
                <MoreInformation>
                  <div className="px-2 pt-2">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-16 h-16 border-2 rounded-full border-white/20"
                        src={responseData.communityIcon.toString()}
                        alt={responseData.name + "icon"}
                      />
                      <h3 className="mb-2 text-4xl font-black text-center text-secondary">
                        {responseData.name}
                      </h3>
                    </div>

                    <p className="pb-2 border-b-[1px] border-white">
                      {responseData.description}
                    </p>
                  </div>

                  <CommunitySection
                    title={"Followers"}
                    data={responseData.followers}
                  />

                  <CommunitySection
                    title={"Tags"}
                    data={
                      typeof responseData.tags === "object" && (
                        <div className="flex flex-wrap gap-2">
                          {responseData.tags.map((tags: string) => (
                            <Badge key={tags}>{tags}</Badge>
                          ))}
                        </div>
                      )
                    }
                  />
                  <CommunitySection
                    title={"Owner"}
                    data={responseData.owner || ""}
                  />
                  <CommunitySection
                    title={"Created"}
                    data={responseData.formattedDateCreated || "error"}
                  />
                  {fetchError && (
                    <p className="text-destructive">
                      Server Error, try again later
                    </p>
                  )}
                  <Button
                    variant={"secondary"}
                    className="block mx-auto mt-4"
                    onClick={toggleFollowedCommunity}
                  >
                    {follows ? "Unfollow" : "Follow"}
                  </Button>
                </MoreInformation>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CommunityPage;
