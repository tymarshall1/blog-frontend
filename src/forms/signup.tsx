import React, { useEffect, useState } from "react";
import Input from "./components/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";

function SignupForm({
  closeSignupDialog,
  openLoginDialog,
}: {
  closeSignupDialog: () => void;
  openLoginDialog: () => void;
}) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const { isLoading, error, responseData, fetchData } = useFetch(
    "http://localhost:3000/api/user/signup",
    "POST"
  );
  useEffect(() => {
    if (responseData && "token" in responseData) {
      const token = (responseData as { token: string }).token;
      localStorage.setItem("accessToken", token);
      closeSignupDialog();
      return;
    }
    if (error) {
      if (error === 409) {
        setSignupError("Username already taken.");
      } else if (error === 400) {
        setSignupError(
          "Username must be at least 2 characters long. Passwords must be 5 characters long."
        );
      } else if (error === 500) {
        setSignupError("Internal server error, try again later.");
      } else {
        setSignupError("An unexpected error occurred.");
      }
    }
  }, [responseData, error, closeSignupDialog]);

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      user.username.length === 0 ||
      user.password.length === 0 ||
      user.confirmPassword.length === 0
    ) {
      setSignupError("No fields may be empty.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }
    fetchData(user);
  };

  return (
    <form className="space-y-4 " action="#">
      <div>
        <h1 className="text-4xl font-black text-white ">Sign Up</h1>
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: event.target.value });
            setSignupError("");
          }}
          invalidInput={
            signupError === "Username already taken." ? true : false
          }
        ></Input>
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, password: event.target.value });
            setSignupError("");
          }}
          invalidInput={
            signupError === "Passwords do not match." ? true : false
          }
        ></Input>
        <Input
          label={"Confirm Password"}
          id={"confirmPassword"}
          type={"password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, confirmPassword: event.target.value });
            setSignupError("");
          }}
          invalidInput={
            signupError === "Passwords do not match." ? true : false
          }
        ></Input>
        {signupError && <p className="text-destructive">*{signupError}</p>}
      </div>
      <div className="space-y-2">
        <p className="font-normal text-white text-md">
          Already have an account?{" "}
          <Button
            onClick={() => {
              closeSignupDialog();
              openLoginDialog();
            }}
            type="button"
            variant={"link"}
            className="p-0 m-0 font-normal text-secondary text-md "
          >
            Login
          </Button>
        </p>
      </div>
      <Button
        disabled={
          user.username.length <= 0 ||
          user.password.length < 5 ||
          user.confirmPassword.length < 5
            ? true
            : false
        }
        onClick={handleSignup}
        className="block w-1/4 mx-auto text-black"
      >
        {isLoading ? "Loading..." : "Sign up"}
      </Button>
    </form>
  );
}

export default SignupForm;
