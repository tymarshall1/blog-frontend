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
import FileInput from "./components/fileInput";
import {
  DefaultImgSelector,
  DefaultImgContainer,
  DefaultImg,
  DefaultImgHeader,
  DefaultImgSection,
  DefaultImgTitle,
} from "@/components/ui/defaultImgSelector";
function ProfileForm() {
  const [editing, setEditing] = useState(false);
  const { updateProfile, error } = useUpdateProfile();
  const [inputError, setInputError] = useState("");
  const [profileImageChange, setProfileImageChange] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { toast } = useToast();
  const [previewProfileImg, setPreviewProfileImg] = useState<
    null | string | ArrayBuffer
  >(null);
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
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultGreen.svg",
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultOrange.svg",
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultPurple.svg",
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultBlue.svg",
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultRed.svg",
    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultYellow.svg",
  ];

  enum defaultIcons {
    none = "",
    defaultGreen = "defaultGreen",
    defaultOrange = "defaultOrange",
    defaultPurple = "defaultPurple",
    defaultBlue = "defaultBlue",
    defaultRed = "defaultRed",
    defaultYellow = "defaultYellow",
  }

  //used to convert the profile image url string to a file type
  useEffect(() => {
    fetch(user?.profile?.profileImg.toString() || "")
      .then((response) => response.blob())
      .then((blob) => {
        setProfileFields({
          ...profileFields,
          profileImg: new File([blob], "profileImg", { type: "image/png" }),
        });
      })
      .catch(() => {
        setInputError("unable to fetch profile image");
      });
  }, []);

  useEffect(() => {
    if (error === 500) setInputError("Server error, try again later.");
    if (error === 400 || error === 403 || error === 401) {
      logout();
      toast({
        title: "Error verifying credentials",
        description: "Logging out, please log back in and try again.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (profileFields.profileImg instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewProfileImg(reader.result);
      };

      reader.readAsDataURL(profileFields.profileImg);
    }
  }, [profileFields.profileImg]);

  function handleDefaultIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProfileFields({
      ...profileFields,
      profileImg: event.target.value,
    });
    setProfileImageChange(true);
    setInputError("");
  }

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
        !acceptableImgTypes.includes(
          profileFields.profileImg instanceof File
            ? profileFields.profileImg?.type
            : profileFields.profileImg
        )
      ) {
        setInputError("file type must be png, jpeg, jpg, or svg");
        return;
      }
      if (
        profileFields.profileImg &&
        profileFields.profileImg instanceof File &&
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
    } else {
      navigate("/");
    }
  };
  return (
    <form className="max-w-lg mx-auto space-y-4" encType="multipart/form-data">
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
      <label htmlFor="profilePicture" aria-hidden={!editing}>
        <div className={`${editing ? "hidden" : ""} `}>
          <img
            className="mx-auto border-white/20 rounded-full border-[1px] max-h-48 max-w-48"
            src={user?.profile?.profileImg.toString()}
            alt="profile image"
          />
        </div>
      </label>
      {editing && (
        <>
          <img
            src={
              profileImageChange
                ? acceptableImgTypes.includes(
                    profileFields.profileImg.toString()
                  )
                  ? profileFields.profileImg.toString()
                  : previewProfileImg !== null &&
                    !(previewProfileImg instanceof ArrayBuffer)
                  ? previewProfileImg
                  : user?.profile?.profileImg.toString()
                : user?.profile?.profileImg.toString()
            }
            alt="user profile image"
            className="w-20 h-20 rounded-full border-white/20 border-[1px]"
          />

          <FileInput
            className="text-white"
            label={"Profile Image"}
            id={"profilePicture"}
            onchange={(event: ChangeEvent<HTMLInputElement>): void => {
              if (profileFields && event.target.files) {
                setProfileFields({
                  ...profileFields,
                  profileImg: event.target.files?.[0],
                });
                setProfileImageChange(true);
                setInputError("");
              }
            }}
            error={
              inputError === "file size must be under 1 megabyte" ||
              inputError === "file type must be png, jpeg, jpg, or svg"
            }
          />

          <div className="flex gap-2">
            <DefaultImgSelector
              className="md:w-[800px]"
              resetDefaultImg={function (): void {
                setProfileFields({
                  ...profileFields,
                  profileImg: defaultIcons.none,
                });
              }}
              itemHasBeenSelected={profileFields.profileImg.toString() !== ""}
            >
              <DefaultImgHeader>
                <p>
                  Choose a <span className="text-secondary">Profile</span>{" "}
                  Picture
                </p>
              </DefaultImgHeader>
              <DefaultImgSection>
                <DefaultImgTitle title={""} />
                <DefaultImgContainer className="flex items-center justify-center gap-2 sm:flex-row md:max-h-72">
                  <></>
                  <DefaultImg
                    id={defaultIcons.defaultGreen}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultGreen.svg"
                    }
                    className="w-40 h-40p-1"
                  />
                  <DefaultImg
                    id={defaultIcons.defaultOrange}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultOrange.svg"
                    }
                    className="w-40 h-40 p-1"
                  />
                  <DefaultImg
                    id={defaultIcons.defaultPurple}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultPurple.svg"
                    }
                    className="w-40 h-40 p-1"
                  />
                </DefaultImgContainer>
              </DefaultImgSection>

              <DefaultImgSection>
                <DefaultImgTitle title={""} />
                <DefaultImgContainer className="flex items-center justify-center gap-2 sm:flex-row md:max-h-72">
                  <></>
                  <DefaultImg
                    id={defaultIcons.defaultBlue}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultBlue.svg"
                    }
                    className="w-40 h-40p-1"
                  />
                  <DefaultImg
                    id={defaultIcons.defaultRed}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultRed.svg"
                    }
                    className="w-40 h-40 p-1"
                  />
                  <DefaultImg
                    id={defaultIcons.defaultYellow}
                    handleChange={handleDefaultIconChange}
                    selectedBackground={profileFields.profileImg.toString()}
                    imgUrl={
                      "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultYellow.svg"
                    }
                    className="w-40 h-40 p-1"
                  />
                </DefaultImgContainer>
              </DefaultImgSection>
            </DefaultImgSelector>
            <p className="text-white">
              Currently Selected:{" "}
              <span className="text-secondary">
                {profileFields.profileImg instanceof File
                  ? profileFields.profileImg.name === "profileImg"
                    ? "None"
                    : profileFields.profileImg.name
                  : "Default"}
              </span>
            </p>
          </div>
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
      </div>
    </form>
  );
}

export default ProfileForm;
