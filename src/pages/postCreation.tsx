import CreatePost from "@/forms/createPost";
import {
  MoreInformation,
  MoreInformationContainer,
  MoreInformationTitle,
  MoreInformationBlock,
  MoreInformationDescription,
} from "@/components/ui/moreInformation";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Community } from "@/types/community";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
function PostCreation() {
  const { communityName } = useParams();
  const { isLoading, error, responseData, fetchData } = useFetch<Community>(
    `${
      import.meta.env.VITE_LIMELEAF_BACKEND_URL
    }/api/community/${communityName}`,
    "GET"
  );
  useEffect(() => {
    if (communityName) {
      fetchData();
    }
  }, [communityName]);
  return (
    <div className="flex justify-around p-4">
      <div className="w-full max-w-xl">
        <CreatePost />
      </div>

      {communityName && (
        <div className="">
          <MoreInformation>
            <MoreInformationContainer>
              {isLoading && <Loading />}
              {error && (
                <div className="text-center text-white">
                  An Error Occurred, try again later.
                </div>
              )}
              <img
                src={responseData?.communityBG.toString()}
                className="rounded "
                alt=""
              />
              <MoreInformationTitle>
                <div className="flex items-center gap-2">
                  <img
                    src={responseData?.communityIcon.toString()}
                    className="w-12 h-12 border-2 rounded-full border-white/20"
                    alt=""
                  />
                  <h3>
                    <Link to={`/community/${responseData?.name}`}>
                      {responseData?.name}
                    </Link>
                  </h3>
                </div>
              </MoreInformationTitle>
              <MoreInformationDescription>
                <p>{responseData?.description}</p>
              </MoreInformationDescription>
              <MoreInformationBlock
                title={"Followers"}
                data={responseData?.followers}
              ></MoreInformationBlock>
              <MoreInformationBlock
                title={"Tags"}
                data={
                  responseData &&
                  typeof responseData.tags === "object" && (
                    <div className="flex flex-wrap gap-2">
                      {responseData.tags.map((tags: string) => (
                        <Badge key={tags}>{tags}</Badge>
                      ))}
                    </div>
                  )
                }
              ></MoreInformationBlock>
              <MoreInformationBlock
                title={"Owner"}
                data={responseData?.owner}
              ></MoreInformationBlock>
              <MoreInformationBlock
                title={"Created"}
                data={responseData?.formattedDateCreated}
              ></MoreInformationBlock>
            </MoreInformationContainer>
          </MoreInformation>
        </div>
      )}
    </div>
  );
}

export default PostCreation;
