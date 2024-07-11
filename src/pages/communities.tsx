import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import useFetch from "@/hooks/useFetch";
import { Community } from "@/types/community";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useToggleFollow } from "@/hooks/useToggleFollow";
function SingleCommunity({
  bg,
  name,
  icon,
  followers,
  description,
}: {
  bg: string;
  name: string;
  icon: string;
  followers: number;
  description: string;
}) {
  const { user } = useAuthContext();
  const { loading, toggleFollow } = useToggleFollow();
  return (
    <Link
      to={`/community/${name}`}
      className="hover:border-secondary border-[1px] border-white/20 rounded  text-white space-y-2 max-h-[420px]"
    >
      <img
        className="w-full rounded max-h-72"
        src={bg}
        alt={name + " background image"}
      />
      <div className="flex items-center gap-2 p-1">
        <img
          className="h-10 w-10 border-[1px] border-white/20 rounded-full"
          src={icon}
          alt={name + " icon"}
        />
        <h2 className="text-xl font-bold">{name}</h2>
        <h3 className="font-light text-white/80 text-md">
          {`${followers} ${followers === 1 ? " follower" : " followers"}`}
        </h3>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFollow(name);
          }}
          className="h-6"
          variant={"secondary"}
        >
          {user &&
          user.profile?.followedCommunities.some(
            (community) => community.name === name
          )
            ? "Unfollow"
            : "follow"}
        </Button>
        {loading && <Loading />}
      </div>
      <p className="px-2 pb-3 overflow-hidden font-normal max-h-40">
        {description}
      </p>
    </Link>
  );
}

function FindCommunities() {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [communities, setCommunities] = useState<Community[]>([]);
  const [noMoreCommunities, setNoMoreCommunities] = useState(false);
  const { isLoading, error, responseData, fetchData } = useFetch<Community[]>(
    `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/community/popular?page=${
      pagination.page
    }&limit=${pagination.limit}`,
    "GET"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pagination.page === 1) return;
    fetchData();
  }, [pagination]);

  useEffect(() => {
    if (responseData) {
      setCommunities((prevCommunities) => [
        ...prevCommunities,
        ...responseData,
      ]);

      if (responseData.length !== pagination.limit) {
        setNoMoreCommunities(true);
        return;
      }
    }
  }, [responseData]);

  const handleSeeMore = () => {
    if (noMoreCommunities) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  };

  const handleSeeLess = () => {
    setCommunities(communities.slice(0, 10));
    setNoMoreCommunities(false);
    setPagination({ page: 1, limit: 10 });
  };

  return (
    <div className="p-2 pb-4 space-y-4">
      <div className="p-1 flex items-start justify-center h-40 rounded bg-sideNav border-[1px] border-white/20">
        <h1 className="text-4xl font-bold text-white">Popular Communities</h1>
      </div>
      {error && <Error />}
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        {communities &&
          communities.map((communitiy, index) => {
            return (
              <SingleCommunity
                key={index}
                bg={
                  typeof communitiy.communityBG === "string"
                    ? communitiy.communityBG
                    : ""
                }
                name={communitiy.name}
                icon={communitiy.communityIcon.toString()}
                followers={
                  typeof communitiy.followers === "number"
                    ? communitiy.followers
                    : 0
                }
                description={communitiy.description}
              />
            );
          })}
        <div className="block mx-auto md:col-span-2">
          {noMoreCommunities ? (
            <Button onClick={handleSeeLess}>See Less </Button>
          ) : (
            <Button onClick={handleSeeMore}>See More </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindCommunities;
