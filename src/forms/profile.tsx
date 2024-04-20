import { ChangeEvent, useEffect, useState } from "react";
import Input from "./components/input";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/hooks/use-toast";
import { ProfileFields } from "@/types/profileFields";
import defaultProfileImg from "../assets/leaf-logo.svg";

function ProfileForm() {
  const [editing, setEditing] = useState(false);
  const { updateProfile, error } = useUpdateProfile();
  const [inputError, setInputError] = useState("");
  const [profileImageChange, setProfileImageChange] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { toast } = useToast();
  const defaultProfileImgFile = new File(
    [defaultProfileImg],
    "defaultProfileImg.svg",
    { type: "image/svg+xml" }
  );
  const [profileFields, setProfileFields] = useState<ProfileFields>({
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    biography: user?.profile?.biography || "",
    profileImg: user?.profile?.profileImg || defaultProfileImgFile,
  });
  const navigate = useNavigate();
  const megaByte = 1048576;
  const acceptableImgTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg+xml",
  ];

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
      if (profileFields.biography.length > 450) {
        setInputError("Bio is to long.");
        return;
      }
      if (profileFields.firstName.length <= 0) {
        setInputError("First name must be at least 1 character");
        return;
      }
      if (profileFields.lastName.length <= 0) {
        setInputError("Last name must be at least 1 character");
        return;
      }
      if (
        profileFields.profileImg &&
        !acceptableImgTypes.includes(profileFields.profileImg?.type)
      ) {
        setInputError("file type must be png, jpeg, jpg, or svg");
        return;
      }
      if (
        profileFields.profileImg &&
        profileFields.profileImg.size > megaByte
      ) {
        setInputError("file size must be under 1 megabyte");
        return;
      }

      updateProfile({
        ...profileFields,
      });
      setEditing(false);
      setInputError("");
      setProfileImageChange(false);
      toast({ title: "Profile has been updated!" });
    } else {
      navigate("/");
    }
  };
  return (
    <form className="max-w-lg mx-auto space-y-4" encType="multipart/form-data">
      {!editing && (
        <img
          className="w-40 h-40 mx-auto bg-white rounded-full"
          src={user?.profile?.profileImg.toString()}
          alt="profile image"
        />
      )}
      {editing && (
        <>
          <div className="w-40 h-40 mx-auto hover:opacity-90 hover:cursor-pointer">
            <label htmlFor="profilePicture">
              <div className="flex items-end w-40 h-40">
                <img
                  className="mx-auto bg-white rounded-full cursor-pointer"
                  src={user?.profile?.profileImg.toString()}
                  alt="profile image"
                />
                <span className="text-2xl cursor-pointer text-secondary material-symbols-outlined">
                  add_a_photo
                </span>
              </div>
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                if (profileFields && event.target.files) {
                  setProfileFields({
                    ...profileFields,
                    profileImg: event.target.files?.[0],
                  });
                  setProfileImageChange(true);
                  setInputError("");
                  event.target.value = "";
                }
              }}
              id="profilePicture"
              className="hidden"
              type="file"
            />
          </div>
          {profileImageChange && (
            <div>
              <h3 className="text-xl font-medium text-white">
                New Profile Image
              </h3>
              <div className="flex items-center ">
                <p
                  className={`${
                    inputError ===
                    ("file type must be png, jpeg, jpg, or svg" ||
                      "file size must be under 1 megabyte")
                      ? "text-destructive"
                      : "text-green-400"
                  } font-thin tracking-wide  underline`}
                >
                  {profileFields.profileImg && (
                    <>{profileFields.profileImg.name}</>
                  )}
                </p>
                <button
                  type="button"
                  className="flex px-2 ml-4 text-sm font-light text-white rounded bg-destructive"
                  onClick={() => {
                    setProfileImageChange(false);
                    setInputError("");
                    setProfileFields({
                      ...profileFields,
                      profileImg:
                        user?.profile?.profileImg || defaultProfileImgFile,
                    });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </>
      )}

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
          inputError === "First name must be at least 1 character"
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
          inputError === "Last name must be at least 1 character" ? true : false
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
              if (profileFields.biography.length > 450) {
                setInputError("Bio is to long.");
              } else {
                setInputError("");
              }
            }
          }}
          value={profileFields.biography}
          required
          disabled={!editing}
          className={`${editing ? "text-black" : "text-white"} ${
            inputError === "Bio is to long."
              ? "outline-2 outline outline-destructive"
              : ""
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
                    profileImg:
                      user?.profile?.profileImg || defaultProfileImgFile,
                  });
                  setEditing(false);
                  setInputError("");
                  setProfileImageChange(false);
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
