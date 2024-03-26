import React, { useState } from "react";
import Input from "./components/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          }}
          invalidInput={false}
        ></Input>
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, password: event.target.value });
          }}
          invalidInput={false}
        ></Input>
        <Input
          label={"Confirm Password"}
          id={"confirmPassword"}
          type={"password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, confirmPassword: event.target.value });
          }}
          invalidInput={false}
        ></Input>
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
      <Button type="submit" className="block w-1/4 mx-auto text-black">
        Sign up
      </Button>
    </form>
  );
}

export default SignupForm;
