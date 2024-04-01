import { useState } from "react";

function useFetch(url: string, method: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseData, setResponseData] = useState(null);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  async function fetchData(requestBody: unknown = null) {
    setIsLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + accessToken,
      },
      body: requestBody ? JSON.stringify(requestBody) : null,
    })
      .then((response) => {
        if (!response.ok) {
          setError(new Error("error code " + response.status));
        }
        return response.json();
      })
      .then((data) => {
        setResponseData(data);
        setError(null);
      })
      .catch((e) => {
        console.error("error...", e);
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, responseData, fetchData };
}

export default useFetch;
