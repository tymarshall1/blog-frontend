import { ChangeEvent, useEffect, useState } from "react";
import Input from "./components/input";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/hooks/use-toast";

type ProfileFields = {
  firstName: string;
  lastName: string;
  biography: string;
};

function ProfileForm() {
  const [editing, setEditing] = useState(false);
  const { updateProfile, error } = useUpdateProfile();
  const [inputError, setInputError] = useState("");
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { toast } = useToast();

  const [profileFields, setProfileFields] = useState<ProfileFields>({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    biography: user?.profile?.biography || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (error === 500) setInputError("Server error, try again later.");
    if (error === 400 || error === 403) {
      logout();
      toast({
        title: "Error verifying credentials",
        description: "Logging out, please log back in and try again.",
      });
    }
  }, [error]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (profileFields) {
      if (
        profileFields.firstName.length > 0 &&
        profileFields.lastName.length > 0
      ) {
        updateProfile({
          ...profileFields,
        });
        setEditing(false);
      } else
        setInputError("First and last names must be at least 1 character.");
    } else {
      navigate("/");
    }
  };
  return (
    <form className="max-w-lg mx-auto space-y-4">
      <div className="w-40 h-40 mx-auto bg-white rounded-full"></div>

      <Input
        label={"First Name"}
        id={"firstName"}
        type={"text"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          if (profileFields) {
            setProfileFields({
              ...profileFields,
              firstName: event.target.value,
            });
            setInputError("");
          }
        }}
        invalidInput={
          inputError === "First and last names must be at least 1 character."
            ? true
            : false
        }
        className={`${editing ? "text-black" : "text-white"}`}
        disabled={!editing}
        value={profileFields.firstName}
      />
      <Input
        label={"Last Name"}
        id={"lastName"}
        type={"text"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          if (profileFields) {
            setProfileFields({
              ...profileFields,
              lastName: event.target.value,
            });
            setInputError("");
          }
        }}
        invalidInput={
          inputError === "First and last names must be at least 1 character."
            ? true
            : false
        }
        className={`${editing ? "text-black" : "text-white"}`}
        disabled={!editing}
        value={profileFields.lastName}
      />

      <label
        className="flex flex-col text-xl font-medium text-white"
        htmlFor="biography"
      >
        Bio
        <textarea
          name="biography"
          id="biography"
          onChange={function (event: ChangeEvent<HTMLTextAreaElement>): void {
            if (profileFields) {
              setProfileFields({
                ...profileFields,
                biography: event.target.value,
              });
            }
          }}
          value={profileFields.biography}
          required
          disabled={!editing}
          className={`${
            editing ? "text-black" : "text-white"
          } w-full h-48 p-2 text-base font-normal text-black rounded`}
        ></textarea>
      </label>
      {inputError && <p className="text-destructive">*{inputError}</p>}
      <div className="flex justify-end gap-2">
        {editing && (
          <>
            <Button
              onClick={() => {
                if (user) {
                  setProfileFields({
                    firstName: user?.profile?.firstName || "",
                    lastName: user?.profile?.lastName || "",
                    biography: user?.profile?.biography || "",
                  });
                  setEditing(false);
                }
              }}
              className="text-black bg-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="hover:bg-white"
              variant={"secondary"}
            >
              Submit
            </Button>
          </>
        )}
        {!editing && (
          <>
            <Button
              onClick={() => setEditing(true)}
              className="text-black hover:bg-secondary"
              variant={"default"}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
