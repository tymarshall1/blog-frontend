import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { AccountData } from "@/types/accountData";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useAuthContext } from "@/hooks/useAuthContext";
import MoreInformation from "../components/ui/moreInformation";
import ProfileForm from "@/forms/profile";
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
    <div className="flex items-center justify-center gap-4">
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
    <div className="px-4 pt-4 space-y-10 rounded bg-gradient-to-r from-sideNav to-moreInformation">
      <div className="flex items-center gap-2 mb-4">
        <img
          className="bg-transparent rounded-full w-14 h-14"
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

function Profile() {
  const { username } = useParams();
  const { user } = useAuthContext();
  const [lastClicked, setLastClicked] = useState<ProfileFilterOptions>(
    ProfileFilterOptions.Overview
  );
  const { isLoading, error, responseData, fetchData } = useFetch<AccountData>(
    `http://localhost:3000/api/user/profile/${username}`,
    "GET"
  );
  const isMyAccount = user?.username === username;

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
              {lastClicked === ProfileFilterOptions.Overview && <>overview</>}
              {lastClicked === ProfileFilterOptions.Posts && <>posts</>}
              {lastClicked === ProfileFilterOptions.Comments && <>comments</>}
              {lastClicked === ProfileFilterOptions.Profile && (
                <>
                  <ProfileForm />
                </>
              )}
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
                className="self-center w-20 h-20 bg-transparent rounded-full"
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
