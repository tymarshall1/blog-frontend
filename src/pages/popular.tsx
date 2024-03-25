import { useEffect } from "react";
function Popular() {
  useEffect(() => {
    fetch("http://localhost:3000/test", { credentials: "include" })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  return <div>Popular</div>;
}

export default Popular;
