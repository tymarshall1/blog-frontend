enum editPostError {
  NONE = "",
  IncorrectCommunity = "You must choose a community.",
  IncorrectTitle = "You must have a title thats between 2 and 50 characters long.",
  IncorrectBody = "You must have a body thats at least 2 characters long.",
}

function validateEditPostForm(post: { postBody: string; postTitle: string }) {
  const defaultBodyText = "<p></p>";
  let validationText = editPostError.NONE;

  switch (true) {
    case !post.postTitle ||
      post.postTitle.length < 2 ||
      post.postTitle.length > 50:
      validationText = editPostError.IncorrectTitle;
      break;

    case !post.postBody ||
      post.postBody === defaultBodyText ||
      post.postBody.length < 9:
      validationText = editPostError.IncorrectBody;
      break;
  }

  return validationText;
}

export { validateEditPostForm, editPostError };
