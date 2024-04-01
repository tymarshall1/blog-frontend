import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Input from "./components/input";
import useFetch from "@/hooks/useFetch";

function LoginForm({
  closeLoginDialog,
  openSignupDialog,
}: {
  closeLoginDialog: () => void;
  openSignupDialog: () => void;
}) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { isLoading, error, responseData, fetchData } = useFetch(
    "http://localhost:3000/api/user/login",
    "POST"
  );

  useEffect(() => {
    if (responseData && "token" in responseData) {
      const token = (responseData as { token: string }).token;
      localStorage.setItem("accessToken", token);
      closeLoginDialog();
      return;
    }
    if (error) setInvalidLogin(true);
  }, [responseData, error, closeLoginDialog]);

  function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (user.password.length === 0 || user.username.length === 0) return;
    fetchData(user);
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
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
