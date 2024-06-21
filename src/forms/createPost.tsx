import { ChangeEvent } from "react";
import Input from "./components/input";
import PostEditor from "./components/postEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/forms/components/select";
import { useCreatePost } from "@/hooks/useCreatePost";
enum SubmitError {
  NONE = "",
  IncorrectCommunity = "You must choose a community.",
  IncorrectTitle = "You must have a title thats between 2 and 50 characters long.",
  IncorrectBody = "You must have a body thats at least 2 characters long.",
}

type PostFields = {
  communityName: string;
  title: string;
  body: string;
};
function CreatePost() {
  const [postFields, setPostFields] = useState<PostFields>({
    communityName: "",
    title: "",
    body: "",
  });
  const { user } = useAuthContext();
  const [submitError, setSubmitError] = useState("");
  const { createPost } = useCreatePost();
  const defaultBodyText = "<p></p>";

  const Navigate = useNavigate();
  function setBody(body: string) {
    setPostFields({ ...postFields, body: body });
    setSubmitError(SubmitError.NONE);
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    switch (true) {
      case !postFields.communityName:
        setSubmitError(SubmitError.IncorrectCommunity);
        return;
      case !postFields.title ||
        postFields.title.length < 2 ||
        postFields.title.length > 50:
        setSubmitError(SubmitError.IncorrectTitle);
        return;
      case !postFields.body ||
        postFields.body === defaultBodyText ||
        postFields.body.length < 9:
        setSubmitError(SubmitError.IncorrectBody);
        return;
      default:
        createPost(postFields);
    }
  }

  return (
    <form className="max-w-xl space-y-4">
      <h1 className="text-3xl font-black text-white">Create Post</h1>
      {user?.profile?.followedCommunities.length === 0 && (
        <p className="p-1 text-white rounded bg-destructive/50">
          You must be following the community you wish to post to. View{" "}
          <Link to={"/"} className="text-secondary">
            Communities
          </Link>
        </p>
      )}
      <Select
        onValueChange={(event) => {
          setPostFields({ ...postFields, communityName: event });
          setSubmitError(SubmitError.NONE);
          Navigate(`../community/${event}/create-post`);
        }}
      >
        <SelectTrigger
          className={`w-[180px] ${
            submitError === SubmitError.IncorrectCommunity
              ? "outline outline-destructive"
              : ""
          }`}
        >
          <SelectValue placeholder="Pick a community" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Followed Communities</SelectLabel>
            {user?.profile?.followedCommunities.map((community) => {
              return (
                <SelectItem key={community.name} value={community.name}>
                  <div className="flex items-center gap-2">
                    <img
                      src={community.communityIcon.toString()}
                      className="rounded-full w-7 h-7"
                      alt="community icon"
                    />
                    <p>{community.name}</p>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        label={"Title"}
        id={"title"}
        type={"text"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          setPostFields({ ...postFields, title: event.target.value });
          setSubmitError(SubmitError.NONE);
        }}
        invalidInput={submitError === SubmitError.IncorrectTitle}
      />
      <div>
        <label className="text-xl font-medium text-white" htmlFor="body">
          Body
        </label>
        <div
          className={`bg-white rounded ${
            submitError === SubmitError.IncorrectBody
              ? "outline outline-destructive"
              : ""
          }`}
        >
          <PostEditor id="body" className="min-h-48" setBody={setBody} />
        </div>
      </div>
      {submitError && <p className="text-destructive">*{submitError}</p>}

      <Button
        disabled={
          !postFields.communityName ||
          !postFields.title ||
          !postFields.body ||
          postFields.body === defaultBodyText ||
          submitError
            ? true
            : false
        }
        onClick={handleSubmit}
        className="block ml-auto"
        variant={"secondary"}
      >
        Submit
      </Button>
    </form>
  );
}

export default CreatePost;
