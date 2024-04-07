import React, { useEffect, useState } from "react";
import Input from "./components/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useSignup";

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
  const { signup, statusCode, isLoading } = useSignup();

  useEffect(() => {
    if (statusCode === 200) setSignupError("");
    else if (statusCode === 409) setSignupError("Username already taken.");
    else if (statusCode === 400) setSignupError("Username already taken.");
    else if (statusCode === 500)
      setSignupError("Server error, try again later.");
    else {
      setSignupError("An unexpected error occurred");
    }
  }, [statusCode]);

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
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(user.username)) {
      setSignupError("Username can only be letters and numbers.");
      return;
    }
    signup({
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword,
      onSuccess: closeSignupDialog,
    });
  };

  return (
    <>
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
              signupError === "Username already taken." ||
              signupError === "Username can only be letters and numbers."
                ? true
                : false
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
            user.username.length <= 1 ||
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
    </>
  );
}

export default SignupForm;
