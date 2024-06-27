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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
enum InputError {
  none = "",
  noIcon = "Please choose an icon for the community.",
  iconToLarge = "Community icon must be under 1 mb.",
  iconIncorrectType = "Community icon must be of type png, jpg, jpeg, or svg.",
  invalidName = "Community names must be between 1 and 15 characters and only consist of letters and numbers.",
  invalidDescription = "Community descriptions must be between 2 and 300 characters long.",
  communityAlreadyExists = "Community already exists.",
}

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

function DefaultBackgroundSelector() {
  enum defaultBgImgs {
    none = "none",
    defaultNature1 = "defaultNature1",
    defaultNature2 = "defaultNature2",
    defaultSpace1 = "defaultSpace1",
    defaultSpace2 = "defaultSpace2",
  }

  const [selectedBackground, setSelectedBackground] = useState(
    defaultBgImgs.none
  );

  const handleChange = (event) => {
    setSelectedBackground(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Selected Background:", selectedBackground);
  };

  return (
    <Dialog>
      <DialogTrigger className="p-1 text-black bg-white rounded hover:bg-secondary max-w-32 max-h-8">
        Default Images
      </DialogTrigger>
      <DialogContent className="bg-black pt-5 border-2 border-white/50  overflow-y-scroll max-h-[75%] max-w-screen-2xl scrollbar">
        <form action="" className="space-y-4">
          <fieldset className="space-y-3">
            <legend className="pb-2 text-xl font-bold text-white border-b-2 md:text-3xl border-white/50">
              Choose a <span className="text-secondary">Background</span> For
              Your New Community!
            </legend>

            <h2 className="text-lg font-medium text-white md:text-xl">
              Nature
            </h2>

            <div className="flex flex-col gap-2 md:flex-row md:max-h-72">
              <input
                id={defaultBgImgs.defaultNature1}
                type="radio"
                name="defaultCommunityBg"
                className="appearance-none"
                value={defaultBgImgs.defaultNature1}
                onChange={handleChange}
              />
              <label
                className={`${
                  selectedBackground === defaultBgImgs.defaultNature1
                    ? "border-secondary"
                    : "border-transparent"
                } border-2 hover:border-secondary`}
                htmlFor={defaultBgImgs.defaultNature1}
              >
                <img
                  src="https://res.cloudinary.com/de7we6c9g/image/upload/v1719451063/Community%20Icons/defaultNature1.jpg"
                  alt="nature community background"
                  className="w-full h-full"
                />
              </label>

              <input
                id={defaultBgImgs.defaultNature2}
                type="radio"
                name="defaultCommunityBg"
                className="appearance-none"
                value={defaultBgImgs.defaultNature2}
                onChange={handleChange}
              />
              <label
                className={`${
                  selectedBackground === defaultBgImgs.defaultNature2
                    ? "border-secondary"
                    : "border-transparent"
                } border-2 hover:border-secondary`}
                htmlFor={defaultBgImgs.defaultNature2}
              >
                <img
                  src="https://res.cloudinary.com/de7we6c9g/image/upload/v1719450981/Community%20Icons/defaultNature2.jpg"
                  alt="nature community background"
                  className="w-full h-full"
                />
              </label>
            </div>

            <h2 className="text-lg font-medium text-white md:text-xl">Space</h2>

            <div className="flex flex-col gap-2 md:flex-row max-h-60">
              <input
                id={defaultBgImgs.defaultSpace1}
                type="radio"
                name="defaultCommunityBg"
                className="appearance-none"
                value={defaultBgImgs.defaultSpace1}
                onChange={handleChange}
              />
              <label
                className={`${
                  selectedBackground === defaultBgImgs.defaultSpace1
                    ? "border-secondary"
                    : "border-transparent"
                } border-2 hover:border-secondary`}
                htmlFor={defaultBgImgs.defaultSpace1}
              >
                <img
                  src="https://res.cloudinary.com/de7we6c9g/image/upload/v1719450600/Community%20Icons/defaultSpace1.jpg"
                  alt="nature community background"
                  className="w-full h-full"
                />
              </label>

              <input
                id={defaultBgImgs.defaultSpace2}
                type="radio"
                name="defaultCommunityBg"
                className="appearance-none"
                value={defaultBgImgs.defaultSpace2}
                onChange={handleChange}
              />
              <label
                className={`${
                  selectedBackground === defaultBgImgs.defaultSpace2
                    ? "border-secondary"
                    : "border-transparent"
                } border-2 hover:border-secondary`}
                htmlFor={defaultBgImgs.defaultSpace2}
              >
                <img
                  src="https://res.cloudinary.com/de7we6c9g/image/upload/v1719450856/Community%20Icons/defaultSpace2.jpg"
                  alt="nature community background"
                  className="w-full h-full"
                />
              </label>
            </div>
          </fieldset>
          <Button
            onClick={handleButtonClick}
            type="button"
            className="block ml-auto"
          >
            Choose Background
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateCommunity() {
  const [community, setCommunity] = useState<Community>({
    communityIcon: "",
    name: "",
    description: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const { loading, fetchError, createCommunity } = useCreateCommunity();
  const megaByte = 1048576;

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

        <div>
          <FileInput
            label={"Community Icon"}
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
            helperText="Files must be png, jpeg, jpg, or svg and be under 1 mb. They also should be 1300 x 250 for best quality."
            error={
              error === InputError.iconIncorrectType ||
              error === InputError.iconToLarge ||
              error === InputError.noIcon
                ? true
                : false
            }
          ></FileInput>
          <DefaultBackgroundSelector />
        </div>

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
