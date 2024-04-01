import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

function Popular() {
  const { isLoading, error, responseData, fetchData } = useFetch(
    "http://localhost:3000/api/posts",
    "GET"
  );
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{responseData}</div>;
}

export default Popular;
