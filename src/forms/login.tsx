import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Input from "./components/input";

function LoginForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (user.password.length < 0 || user.username.length < 0) return;
    const loginRequest = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const loginJson = await loginRequest.json();

    if ("token" in loginJson) {
      setCookie("token", loginJson.token, { path: "/" });
      return navigate("/");
    }
    console.log(loginJson);
  }

  return (
    <form className="space-y-4 " action="#">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white ">Login</h1>
        <p className="font-normal text-white text-md">
          By continuing, you agree to our{" "}
          <Link className="text-secondary" to={""}>
            User Agreement
          </Link>{" "}
          and acknowledge that you understand the{" "}
          <Link className="text-secondary" to={""}>
            Privacy Policy
          </Link>
        </p>
      </div>
      <div className="space-y-2">
        <Input
          label={"Username"}
          id={"username"}
          type={"text"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ username: e.target.value, password: user.password });
          }}
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ username: user.username, password: e.target.value });
          }}
        />
      </div>
      <div className="space-y-2">
        <p className="font-normal text-white text-md">
          Forgot your{" "}
          <Link className="text-secondary" to={""}>
            username
          </Link>
          {" or "}
          <Link className="text-secondary" to={""}>
            password
          </Link>
          {"?"}
        </p>
        <p className="font-normal text-white text-md">
          Don't have an account yet?{" "}
          <Link className="text-secondary" to={""}>
            Create one
          </Link>
        </p>
      </div>
      <Button
        onClick={handleLogin}
        className={`${
          user.username.length <= 0 || user.password.length < 10
            ? "opacity-20"
            : "opacity-100"
        } block w-1/4 mx-auto text-black`}
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
