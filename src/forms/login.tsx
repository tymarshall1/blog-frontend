import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Input from "./components/input";

function LoginForm({
  closeLoginDialog,
  openSignupDialog,
}: {
  closeLoginDialog: () => void;
  openSignupDialog: () => void;
}) {
  const [user, setUser] = useState({ username: "", password: "" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [invalidLogin, setInvalidLogin] = useState(false);

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
      localStorage.setItem("accessToken", loginJson.token);
      closeLoginDialog();
      return;
    }

    setInvalidLogin(true);
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
          invalidInput={invalidLogin}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: e.target.value });
            setInvalidLogin(false);
          }}
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          invalidInput={invalidLogin}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, password: e.target.value });
            setInvalidLogin(false);
          }}
        />
        {invalidLogin && (
          <p className="text-destructive">*Invalid username or password</p>
        )}
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
          <Button
            onClick={() => {
              closeLoginDialog();
              openSignupDialog();
            }}
            type="button"
            variant={"link"}
            className="p-0 m-0 font-normal text-secondary text-md "
          >
            Create One
          </Button>
        </p>
      </div>
      <Button
        type="submit"
        disabled={
          user.username.length <= 0 || user.password.length < 5 ? true : false
        }
        onClick={handleLogin}
        className="block w-1/4 mx-auto text-black"
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
