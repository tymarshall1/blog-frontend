import { ChangeEvent, useEffect } from "react";
import Input from "./components/input";
import PostEditor from "./components/postEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/forms/components/select";
function CreatePost() {
  const [body, setBody] = useState("");
  const { user } = useAuthContext();

  return (
    <form className="max-w-lg space-y-4">
      <h1 className="text-3xl font-black text-white">Create Post</h1>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pick a community" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Followed Communities</SelectLabel>
            {user?.profile?.followedCommunities.map((community) => {
              return (
                <SelectItem key={community.name} value={community.name}>
                  {community.name}
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
        onChange={function (event: ChangeEvent<Element>): void {
          throw new Error("Function not implemented.");
        }}
        invalidInput={false}
      />
      <div>
        <label className="text-xl font-medium text-white" htmlFor="body">
          Body
        </label>
        <div className="bg-white rounded ">
          <PostEditor setBody={setBody} />
        </div>
      </div>
      <Button className="block ml-auto" variant={"secondary"}>
        Submit
      </Button>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </form>
  );
}

export default CreatePost;
