import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { ProfileData } from "@/types/profile";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useAuthContext } from "@/hooks/useAuthContext";
import MoreInformation from "../components/ui/moreInformation";

function AccountFilter({ isMyAccount }: { isMyAccount: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button className="font-bold bg-none text-md" variant={"link"}>
        Overview
      </Button>
      <Button className="font-bold bg-none text-md" variant={"link"}>
        Posts
      </Button>
      <Button className="font-bold bg-none text-md" variant={"link"}>
        Comments
      </Button>
      {isMyAccount && (
        <Button className="font-bold bg-none text-md" variant={"link"}>
          Profile
        </Button>
      )}
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
  }, [username, user]);

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        {isLoading && <Loading />}
        {error && (
          <>
            {error === 404 && <Error />}
            {error === 500 && "Internal server error, try again later"}
          </>
        )}
        {!error && !isLoading && (
          <>
            <div className="m-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-full w-14 h-14"></div>
                <h1 className="text-xl font-bold text-white">
                  {responseData ? responseData.username : "none"}
                </h1>
              </div>
              <AccountFilter isMyAccount={user?.username === username} />
              <h1></h1>
            </div>
          </>
        )}
      </div>
      <MoreInformation defaultInformation={error ? true : false}>
        <>
          {isLoading && <Loading />}
          {!error && (
            <>
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
            </>
          )}
        </>
      </MoreInformation>
    </div>
  );
}

export default Profile;
