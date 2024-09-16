import { useState } from "react";

function useFetch<T>(url: string, method: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<T | null>(null);

  const accessToken = localStorage.getItem("accessToken") || "undefined";

  async function fetchData(requestBody: unknown = null) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + accessToken,
        },
        body: requestBody ? JSON.stringify(requestBody) : null,
      });

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      const data: T = await response.json();
      setResponseData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(Number(error.message) || 500);
      } else {
        setError(500);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, responseData, fetchData };
}

export default useFetch;
