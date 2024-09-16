enum editPostError {
  NONE = "",
  IncorrectCommunity = "You must choose a community.",
  IncorrectTitle = "You must have a title that's between 2 and 50 characters long.",
  IncorrectBody = "You must have a body that's at least 2 characters long.",
}

function validateEditPostForm(post: { postBody: string; postTitle: string }) {
  let validationText = editPostError.NONE;

  const isBodyEmpty = (body: string): boolean => {
    const trimmedBody = body.trim();
    const emptyContentRegex = /^<p>\s*<\/p>$/;
    return !trimmedBody || emptyContentRegex.test(trimmedBody);
  };

  const isTitleInvalid = (title: string): boolean => {
    return !title || title.trim().length < 2;
  };

  switch (true) {
    case isTitleInvalid(post.postTitle) || post.postTitle.length > 50:
      validationText = editPostError.IncorrectTitle;
      break;

    case isBodyEmpty(post.postBody) || post.postBody.length < 9:
      validationText = editPostError.IncorrectBody;
      break;
  }

  return validationText;
}

export { validateEditPostForm, editPostError };
