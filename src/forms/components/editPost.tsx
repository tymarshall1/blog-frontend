import { Button } from "@/components/ui/button";
import Input from "./input";
import PostEditor from "./postEditor";
import { useEffect, useState } from "react";
import { useEditPost } from "@/hooks/useEditPost";
import Loading from "@/components/ui/loading";

function EditPost({
  postTitle,
  postBody,
  closeDialog,
  postID,
}: {
  postTitle: string;
  postBody: string;
  closeDialog: () => void;
  postID: string;
}) {
  const [post, setPost] = useState({
    postTitle: postTitle,
    postBody: postBody,
  });

  const { editPost, validationErrors, fetchError, isLoading, responseData } =
    useEditPost(postID);

  useEffect(() => {
    console.log(responseData);
    if (responseData) {
      closeDialog();
      window.location.reload();
    }
  }, [responseData]);

  async function handleEditPost() {
    await editPost(post);
  }

  function setBody(body: string) {
    setPost({ ...post, postBody: body });
  }

  return (
    <div className="w-full space-y-2">
      {isLoading && <Loading />}
      {fetchError !== null && (
        <p className="font-bold text-destructive">
          We were unable to process your request, try again later.
        </p>
      )}
      <h1 className="text-3xl font-bold text-white">Edit Post</h1>
      <Input
        label={"Title"}
        id={"title"}
        type={"text"}
        defaultText={postTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPost({ ...post, postTitle: e.target.value })
        }
        invalidInput={!!validationErrors.titleError}
      />
      {validationErrors.titleError && (
        <p className="text-destructive">{validationErrors.titleError}</p>
      )}
      <div>
        <label className="text-xl font-medium text-white" htmlFor="postBody">
          Body
        </label>
        <div
          className={`${
            validationErrors.bodyError
              ? "border-2 rounded border-destructive"
              : ""
          }`}
        >
          <PostEditor
            defaultText={postBody}
            setBody={setBody}
            id={"postBody"}
            className="p-2 overflow-y-scroll max-h-96 min-h-48"
          />
        </div>
        {validationErrors.bodyError && (
          <p className="text-destructive">{validationErrors.bodyError}</p>
        )}
      </div>
      <div className="space-x-2 text-right">
        <Button onClick={closeDialog} variant={"destructive"}>
          Cancel
        </Button>
        <Button onClick={handleEditPost}>Edit Post</Button>
      </div>
    </div>
  );
}

export default EditPost;
