import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Community } from "@/types/community";
import Error from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import MoreInformation from "@/components/ui/moreInformation";
import { Badge } from "@/components/ui/badge";

type CommunityHeaderProps = {
  communityName: string;
  communityDescription: string;
  communityIcon: string;
  currentlyFollows: boolean;
};

function CommunityHeader({
  communityName,
  communityDescription,
  communityIcon,
  currentlyFollows,
}: CommunityHeaderProps) {
  return (
    <div className="p-4 rounded bg-sideNav">
      {!currentlyFollows && (
        <Button variant={"secondary"} className="block ml-auto ">
          Follow
        </Button>
      )}
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          className="w-48 h-48 rounded-full"
          src={communityIcon}
          alt="community icon"
        />
        <h1 className="text-5xl font-black text-center">{communityName}</h1>
        <p className="max-w-lg overflow-hidden font-thin tracking-wider text-white break-words text-md max-h-40 ">
          {communityDescription}
        </p>
      </div>
    </div>
  );
}
type ProfileSectionProps = {
  title: string;
  data: string | number | string[] | React.ReactNode;
};

function ProfileSection(props: ProfileSectionProps) {
  return (
    <div className="p-2 space-y-1">
      <h2 className="text-lg font-black text-secondary">{props.title}</h2>
      <div className="pb-2 tracking-wider border-b-[1px] border-white border-secondary">
        {props.data}
      </div>
    </div>
  );
}

function CommunityPage() {
  const { communityName } = useParams();
  const { isLoading, error, responseData, fetchData } = useFetch<Community>(
    `http://localhost:3000/api/community/${communityName}`,
    "GET"
  );
  useEffect(() => {
    fetchData();
  }, [communityName]);

  return (
    <div className="m-4 text-white ">
      {isLoading && <Loading />}
      {error === 404 ? (
        <Error />
      ) : (
        <>
          {responseData && (
            <>
              <CommunityHeader
                communityName={responseData.name}
                communityDescription={responseData.description}
                communityIcon={responseData.communityIcon.toString()}
                currentlyFollows={false}
              />
              <div className="flex">
                <div className="flex-1 mt-2">Posts will go here</div>
                <MoreInformation>
                  <ProfileSection
                    title={"Community"}
                    data={responseData.name}
                  />
                  <ProfileSection
                    title={"Followers"}
                    data={responseData.followers?.length || 0}
                  />

                  <ProfileSection
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
                  <ProfileSection
                    title={"Owner"}
                    data={responseData.owner || ""}
                  />
                  <ProfileSection
                    title={"Created"}
                    data={responseData.formattedDateCreated || "error"}
                  />
                </MoreInformation>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CommunityPage;
