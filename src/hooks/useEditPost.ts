import { useState } from "react";
import useFetch from "./useFetch";
import {
  validateEditPostForm,
  editPostError,
} from "@/errorHandling/formValidation";

export function useEditPost(postID: string) {
  const { isLoading, error, responseData, fetchData } = useFetch(
    `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/posts/${postID}/edit`,
    "PATCH"
  );

  const [validationErrors, setValidationErrors] = useState({
    titleError: "",
    bodyError: "",
  });

  async function editPost(post: { postBody: string; postTitle: string }) {
    const validationError = validateEditPostForm(post);
    setValidationErrors({
      titleError:
        validationError === editPostError.IncorrectTitle
          ? editPostError.IncorrectTitle
          : "",
      bodyError:
        validationError === editPostError.IncorrectBody
          ? editPostError.IncorrectBody
          : "",
    });

    if (validationError) {
      return { success: false, error: validationError };
    }

    try {
      await fetchData(post);
      return { success: true };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        error: "An error occurred while updating the post.",
      };
    }
  }

  return {
    editPost,
    validationErrors,
    fetchError: error,
    isLoading,
    responseData,
  };
}
