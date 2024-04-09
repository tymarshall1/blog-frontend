import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { ProfileData } from "@/types/profile";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useAuthContext } from "@/hooks/useAuthContext";
import MoreInformation from "../components/ui/moreInformation";

function AccountFilter({ isMyAccount }: { isMyAccount: boolean }) {
  const [lastClicked, setLastClicked] = useState("overview");
  const handleClick = (lastLinkSelected: string) => {
    setLastClicked(lastLinkSelected);
  };
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={() => handleClick("overview")}
        className={`${
          lastClicked === "overview" ? " bg-black " : ""
        } font-bold bg-none text-md rounded-none rounded-t-lg`}
        variant={"link"}
      >
        Overview
      </Button>
      <Button
        onClick={() => handleClick("posts")}
        className={`${
          lastClicked === "posts" ? "bg-black" : ""
        } font-bold bg-none text-md rounded-none rounded-t-lg`}
        variant={"link"}
      >
        Posts
      </Button>
      <Button
        onClick={() => handleClick("comments")}
        className={`${
          lastClicked === "comments" ? "bg-black" : ""
        } font-bold bg-none text-md rounded-none  rounded-t-lg`}
        variant={"link"}
      >
        Comments
      </Button>
      {isMyAccount && (
        <Button
          onClick={() => handleClick("profile")}
          className={`${
            lastClicked === "profile" ? "bg-black" : ""
          } font-bold bg-none text-md rounded-none  rounded-t-lg`}
          variant={"link"}
        >
          Profile
        </Button>
      )}
    </div>
  );
}

function ProfileHeader({
  accountTitle,
  isMyAccount,
}: {
  accountTitle: string;
  isMyAccount: boolean;
}) {
  return (
    <div className="px-4 pt-4 space-y-10 rounded bg-gradient-to-r from-sideNav to-moreInformation">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-white rounded-full w-14 h-14"></div>
        <h1 className="text-2xl font-bold text-white">{accountTitle}</h1>
      </div>
      <AccountFilter isMyAccount={isMyAccount} />
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

function Profile() {
  const { username } = useParams();
  const { user } = useAuthContext();
  const { isLoading, error, responseData, fetchData } = useFetch<ProfileData>(
    `http://localhost:3000/api/user/profile/${username}`,
    "GET"
  );

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <div className="flex gap-4 m-2">
      <div className="flex-1 mt-4">
        {isLoading && <Loading />}
        {error && (
          <>
            {error === 404 && <Error />}
            {error === 500 && "Internal server error, try again later"}
          </>
        )}
        {!error && !isLoading && (
          <>
            <ProfileHeader
              accountTitle={responseData ? responseData.username : "none"}
              isMyAccount={user?.username === username}
            />
          </>
        )}
      </div>
      <MoreInformation defaultInformation={error ? true : false}>
        <>
          {isLoading && <Loading />}
          {!error && !isLoading && (
            <div className="flex flex-col">
              <div className="self-center w-20 h-20 bg-white rounded-full"></div>
              <ProfileSection
                title={"Username"}
                data={responseData?.username || "error"}
              />
              <ProfileSection
                title={"First Name"}
                data={responseData?.profile.firstName || "error"}
              />
              <ProfileSection
                title={"Last Name"}
                data={responseData?.profile.lastName || "error"}
              />
              <ProfileSection
                title={"Posts"}
                data={responseData?.profile.posts.length || "0"}
              />
              <ProfileSection
                title={"Comments"}
                data={responseData?.profile.comments.length || "0"}
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
