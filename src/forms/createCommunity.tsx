import { ChangeEvent, useEffect } from "react";
import Input from "./components/input";
import LeafLogo from "../assets/leaf-logo.svg";
import { Button } from "@/components/ui/button";
import FileInput from "./components/fileInput";
import TextArea from "./components/textArea";
import { useState } from "react";
import { Community } from "@/types/community";
import { AcceptableImg } from "@/types/acceptableImgs";
import { separateCommas } from "@/lib/utils";
import { useCreateCommunity } from "@/hooks/useCreateCommunity";
import Loading from "@/components/ui/loading";

import {
  DefaultImgSelector,
  DefaultImgHeader,
  DefaultImgSection,
  DefaultImgTitle,
  DefaultImgContainer,
  DefaultImg,
} from "@/components/ui/defaultImgSelector";

function FormHeader() {
  return (
    <div className="p-4 space-y-2 rounded bg-sideNav">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img
          className="inline-block w-10 h-10"
          src={LeafLogo}
          alt="leaf logo"
        />
        <h1 className="inline-block text-4xl font-black text-white">
          Create a Community
        </h1>
        <img
          className="inline-block w-10 h-10"
          src={LeafLogo}
          alt="leaf logo"
        />
      </div>

      <p className="tracking-wider text-white ">
        By creating a community, you agree to our
        <span className="text-secondary"> user agreement.</span>
      </p>
      <p className="tracking-wider text-white">
        As a brief reminder, you will be responsible for:
      </p>
      <ul className="p-2 space-y-1 font-light tracking-wider text-white list-disc list-inside">
        <li>
          <span className="text-secondary">Overseeing and maintaining </span>
          the quality of user-generated content
        </li>
        <li>
          <span className="text-secondary">Enhancing </span>
          user satisfaction through proactive engagement and support.
        </li>
        <li>
          <span className="text-secondary">Encouraging </span>
          the creation of content that adds value and relevance to the
          community's interests.
        </li>
      </ul>
    </div>
  );
}

function CreateCommunity() {
  const [community, setCommunity] = useState<Community>({
    communityIcon: "",
    communityBG: "",
    name: "",
    description: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const { loading, fetchError, createCommunity } = useCreateCommunity();
  const megaByte = 1048576;

  enum defaultBgImgs {
    none = "",
    defaultNature1 = "defaultNature1",
    defaultNature2 = "defaultNature2",
    defaultSpace1 = "defaultSpace1",
    defaultSpace2 = "defaultSpace2",
  }

  enum defaultIcons {
    none = "",
    defaultGreen = "defaultGreen",
    defaultOrange = "defaultOrange",
    defaultPurple = "defaultPurple",
    defaultBlue = "defaultBlue",
    defaultRed = "defaultRed",
    defaultYellow = "defaultYellow",
  }

  enum InputError {
    none = "",
    noIcon = "Please choose an icon for the community.",
    iconToLarge = "Community icon must be under 1 mb.",
    iconIncorrectType = "Community icon must be of type png, jpg, jpeg, or svg.",
    noBg = "Please choose a background for the community.",
    bgToLarge = "Community background must be under 1 mb.",
    bgIncorrectType = "Community background must be of type png, jpg, jpeg, or svg.",
    invalidName = "Community names must be between 1 and 15 characters and only consist of letters and numbers.",
    invalidDescription = "Community descriptions must be between 2 and 300 characters long.",
    communityAlreadyExists = "Community already exists.",
  }

  const handleDefaultBgImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommunity({
      ...community,
      communityBG: event.target.value,
    });
  };

  const handleDefaultIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommunity({
      ...community,
      communityIcon: event.target.value,
    });
  };

  useEffect(() => {
    switch (fetchError) {
      case 500:
        setError("Server error, try again later");
        break;
      case 400:
        setError("Error with data formatting, try again");
        break;
      case 401:
        setError("Error verifying credentials");
        break;
      case 403:
        setError("Error verifying credentials");
        break;
      case 409:
        setError(InputError.communityAlreadyExists);
        break;
    }
  }, [fetchError]);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;
    switch (true) {
      case !community.communityIcon:
        setError(InputError.noIcon);
        break;
      case typeof community.communityIcon === "object" &&
        community.communityIcon.size > megaByte:
        setError(InputError.iconToLarge);
        break;
      case typeof community.communityIcon === "object" &&
        !Object.values(AcceptableImg).includes(
          community.communityIcon.type as AcceptableImg
        ):
        setError(InputError.iconIncorrectType);
        break;

      case !community.communityBG:
        setError(InputError.noBg);
        break;
      case typeof community.communityBG === "object" &&
        community.communityBG.size > megaByte:
        setError(InputError.bgToLarge);
        break;
      case typeof community.communityBG === "object" &&
        !Object.values(AcceptableImg).includes(
          community.communityBG.type as AcceptableImg
        ):
        setError(InputError.bgIncorrectType);
        break;

      case !regex.test(community.name):
        setError(InputError.invalidName);
        break;
      case community.name.length < 1 || community.name.length > 15:
        setError(InputError.invalidName);
        break;
      case community.description.length < 2 ||
        community.description.length > 300:
        setError(InputError.invalidDescription);
        break;
      default:
        createCommunity(community);
    }
  }

  return (
    <form className="max-w-screen-lg p-1 mx-auto mt-4 space-y-4 ">
      <FormHeader />

      <div className="max-w-screen-sm mx-auto space-y-3">
        {loading && (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}

        <Input
          label={"Name"}
          id={"communityName"}
          type={"text"}
          onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            setCommunity({ ...community, name: event.target.value });
            if (event.target.value.length > 15) {
              setError(InputError.invalidName);
            } else {
              setError(InputError.none);
            }
          }}
          invalidInput={
            error === InputError.invalidName ||
            error === InputError.communityAlreadyExists
              ? true
              : false
          }
        ></Input>
        <div>
          <FileInput
            label={"Icon"}
            id={"communityIcon"}
            onchange={function (event: ChangeEvent<HTMLInputElement>): void {
              if (event.target.files) {
                setCommunity({
                  ...community,
                  communityIcon: event.target.files?.[0],
                });
                setError(InputError.none);
              }
            }}
            helperText="Files must be png, jpeg, jpg, or svg and be under 1 mb. They also should be 24 x 24 for best quality."
            error={
              error === InputError.iconIncorrectType ||
              error === InputError.iconToLarge ||
              error === InputError.noIcon
                ? true
                : false
            }
          ></FileInput>

          <DefaultImgSelector
            itemHasBeenSelected={community.communityIcon !== ""}
            resetDefaultImg={() =>
              setCommunity({ ...community, communityIcon: defaultBgImgs.none })
            }
          >
            <DefaultImgHeader>
              <p>
                Choose an <span className="text-secondary">Icon</span> For Your
                New Community!
              </p>
            </DefaultImgHeader>
            <DefaultImgSection>
              <DefaultImgTitle title={""} />
              <DefaultImgContainer className="flex flex-col items-center gap-2 sm:flex-row md:max-h-72">
                <DefaultImg
                  id={defaultIcons.defaultGreen}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultGreen.svg"
                  }
                  className="p-2 w-60 h-60"
                />
                <DefaultImg
                  id={defaultIcons.defaultOrange}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultOrange.svg"
                  }
                  className="p-2 w-60 h-60 "
                />
                <DefaultImg
                  id={defaultIcons.defaultPurple}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultPurple.svg"
                  }
                  className="p-2 w-60 h-60"
                />
              </DefaultImgContainer>
            </DefaultImgSection>
            <DefaultImgSection>
              <DefaultImgTitle title={""} />
              <DefaultImgContainer className="flex flex-col items-center gap-2 sm:flex-row md:max-h-72">
                <DefaultImg
                  id={defaultIcons.defaultBlue}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720553127/Community%20Icons/defaultBlue.svg"
                  }
                  className="p-2 w-60 h-60"
                />
                <DefaultImg
                  id={defaultIcons.defaultRed}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554284/Community%20Icons/defaultRed.svg"
                  }
                  className="p-2 w-60 h-60 "
                />
                <DefaultImg
                  id={defaultIcons.defaultYellow}
                  handleChange={handleDefaultIconChange}
                  selectedBackground={community.communityIcon.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1720554420/Community%20Icons/defaultYellow.svg"
                  }
                  className="p-2 w-60 h-60"
                />
              </DefaultImgContainer>
            </DefaultImgSection>
          </DefaultImgSelector>
          <span className="text-white">
            {" "}
            Currently selected:{" "}
            <span className="text-secondary">
              {typeof community.communityIcon === "string"
                ? "Default"
                : community.communityIcon.name}
            </span>
          </span>
        </div>
        <TextArea
          label={"Description"}
          id={"description"}
          onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            setCommunity({ ...community, description: event.target.value });
            if (event.target.value.length > 300) {
              setError(InputError.invalidDescription);
            } else {
              setError(InputError.none);
            }
          }}
          error={error === InputError.invalidDescription ? true : false}
          className="min-h-48"
        ></TextArea>
        {/* background */}
        <div>
          <FileInput
            label={"Background"}
            id={"communityBg"}
            onchange={function (event: ChangeEvent<HTMLInputElement>): void {
              if (event.target.files) {
                setCommunity({
                  ...community,
                  communityBG: event.target.files?.[0],
                });
                setError(InputError.none);
              }
            }}
            helperText="Files must be png, jpeg, jpg, or svg and be under 1 mb. They also should be 1300 x 250 for best quality."
            error={
              error === InputError.bgIncorrectType ||
              error === InputError.bgToLarge ||
              error === InputError.noBg
                ? true
                : false
            }
          ></FileInput>

          <DefaultImgSelector
            itemHasBeenSelected={community.communityBG !== ""}
            resetDefaultImg={() =>
              setCommunity({ ...community, communityBG: defaultBgImgs.none })
            }
          >
            <DefaultImgHeader>
              <p>
                Choose a <span className="text-secondary">Background</span> For
                Your New Community!
              </p>
            </DefaultImgHeader>
            <DefaultImgSection>
              <DefaultImgTitle title={"Nature"} />
              <DefaultImgContainer className="flex flex-col gap-2 md:flex-row md:max-h-72">
                <DefaultImg
                  id={defaultBgImgs.defaultNature1}
                  handleChange={handleDefaultBgImgChange}
                  selectedBackground={community.communityBG.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1719451063/Community%20Backgrounds/defaultNature1.jpg"
                  }
                />
                <DefaultImg
                  id={defaultBgImgs.defaultNature2}
                  handleChange={handleDefaultBgImgChange}
                  selectedBackground={community.communityBG.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1719451063/Community%20Backgrounds/defaultNature2.jpg"
                  }
                />
              </DefaultImgContainer>
            </DefaultImgSection>
            <DefaultImgSection>
              <DefaultImgTitle title={"Space"} />
              <DefaultImgContainer className="flex flex-col gap-2 md:flex-row md:max-h-72">
                <DefaultImg
                  id={defaultBgImgs.defaultSpace1}
                  handleChange={handleDefaultBgImgChange}
                  selectedBackground={community.communityBG.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1719450600/Community%20Backgrounds/defaultSpace1.jpg"
                  }
                />
                <DefaultImg
                  id={defaultBgImgs.defaultSpace2}
                  handleChange={handleDefaultBgImgChange}
                  selectedBackground={community.communityBG.toString()}
                  imgUrl={
                    "https://res.cloudinary.com/de7we6c9g/image/upload/v1719450600/Community%20Backgrounds/defaultSpace2.jpg"
                  }
                />
              </DefaultImgContainer>
            </DefaultImgSection>
          </DefaultImgSelector>
          <span className="text-white">
            {" "}
            Currently selected:{" "}
            <span className="text-secondary">
              {typeof community.communityBG === "string"
                ? "Default"
                : community.communityBG.name}
            </span>
          </span>
        </div>
        <TextArea
          label={"Tags"}
          id={"tags"}
          onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            setCommunity({
              ...community,
              tags: separateCommas(event.target.value),
            });
            setError(InputError.none);
          }}
          error={false}
          required={false}
          className="min-h-20"
          placeHolder="Football, Sports, NFL"
          helperText="Tags must be separated by commas."
        ></TextArea>
        {error && <p className="text-destructive">*{error}</p>}

        <Button
          disabled={
            community.communityIcon &&
            community.communityBG &&
            community.name &&
            community.description &&
            error === InputError.none
              ? false
              : true
          }
          onClick={handleSubmit}
          className="block ml-auto"
        >
          Create Community
        </Button>
      </div>
    </form>
  );
}

export default CreateCommunity;
