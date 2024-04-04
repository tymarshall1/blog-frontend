import { Button } from "@/components/ui/button";
// import { useContext, useEffect } from "react";
// import { userContext } from "@/contexts/userContext";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
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

  const { isLoading, error, responseData, fetchData } = useFetch(
    `http://localhost:3000/api/user/profile/${username}`,
    "GET"
  );

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <>
      {isLoading && <>Loading...</>}
      {error && <>An error occurred.</>}
      {!isLoading && !error && (
        <>
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-full w-14 h-14"></div>
              <h1 className="text-xl font-bold text-white">
                {responseData && "username" in responseData
                  ? (responseData as { username: string }).username
                  : "none"}
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
