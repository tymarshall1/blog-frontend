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
          helperText="Files must be png, jpeg, jpg, or svg and be under 1 mb"
          error={
            error === InputError.iconIncorrectType ||
            error === InputError.iconToLarge ||
            error === InputError.noIcon
              ? true
              : false
          }
        ></FileInput>

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
