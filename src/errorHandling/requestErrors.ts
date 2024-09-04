function fetchError(status: number) {
  let errorText = "No error";
  switch (status) {
    case 401:
      errorText = "Unauthorized";
      break;
    case 403:
      errorText = "Forbidden";
      break;
    case 404:
      errorText = "Not Found";
      break;
    case 500:
      errorText = "Server error, try again later.";
      break;
  }
  return errorText;
}

export default fetchError;
