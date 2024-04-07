import { Button } from "@/components/ui/button";
// import { useContext, useEffect } from "react";
// import { userContext } from "@/contexts/userContext";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { ProfileData } from "@/types/profile";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
function AccountFilter() {
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
      <Button className="font-bold bg-none text-md" variant={"link"}>
        Profile
      </Button>
    </div>
  );
}

function Profile() {
  const { username } = useParams();
  const { isLoading, error, responseData, fetchData } = useFetch<ProfileData>(
    `http://localhost:3000/api/user/profile/${username}`,
    "GET"
  );

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
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
            <AccountFilter />
            <h1></h1>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
