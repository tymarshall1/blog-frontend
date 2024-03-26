import useFetchAuth from "@/hooks/useFetchAuth";

function Popular() {
  const { data, loading, error } = useFetchAuth(
    "http://localhost:3000/api/posts"
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data}</div>;
}

export default Popular;
