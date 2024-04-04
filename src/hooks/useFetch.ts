import { useState } from "react";

function useFetch<T>(url: string, method: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<T | null>(null);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : "undefined";

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
          throw new Error(response.status.toString());
        }
        return response.json();
      })
      .then((data: T) => {
        setResponseData(data);
        setError(null);
      })
      .catch((errorCode) => {
        if (isNaN(errorCode.message)) {
          setError(500);
          return;
        }
        setError(Number(errorCode.message));
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, responseData, fetchData };
}

export default useFetch;
