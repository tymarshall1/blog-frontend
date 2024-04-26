import LoginForm from "@/forms/login";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import SignupForm from "@/forms/signup";

function Unauthorized() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const closeLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  const closeSignupDialog = () => {
    setIsSignupDialogOpen(false);
  };

  const openSignupDialog = () => {
    setIsSignupDialogOpen(true);
  };

  const openLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 mt-2 rounded bg-sideNav">
      <h1 className="text-3xl font-black text-white">
        You do not have access to this page.
      </h1>
      <p className="text-white">Please login or sign up</p>
      <div className="space-x-4">
        <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
          <DialogTrigger
            className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-black transition-colors rounded-md bg-primary hover:bg-secondary whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsSignupDialogOpen(true)}
          >
            Sign Up
          </DialogTrigger>
          <DialogContent>
            <SignupForm
              closeSignupDialog={closeSignupDialog}
              openLoginDialog={openLoginDialog}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
          <DialogTrigger
            className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-black transition-colors rounded-md bg-primary hover:bg-secondary whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsLoginDialogOpen(true)}
          >
            Login
          </DialogTrigger>
          <DialogContent>
            <LoginForm
              closeLoginDialog={closeLoginDialog}
              openSignupDialog={openSignupDialog}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Unauthorized;
