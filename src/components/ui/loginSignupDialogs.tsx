import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/forms/login";
import SignupForm from "@/forms/signup";
import { useState } from "react";
function LoginSignupDialogs() {
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
    <div className="flex gap-4">
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogTrigger
          className="text-xl font-black hover:text-secondary"
          onClick={() => setIsLoginDialogOpen(true)}
        >
          Login
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <LoginForm
            closeLoginDialog={closeLoginDialog}
            openSignupDialog={openSignupDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
        <DialogTrigger
          className="px-2 py-1 text-xl font-black rounded text-foreground bg-secondary hover:bg-white/80 "
          onClick={() => setIsSignupDialogOpen(true)}
        >
          Sign Up
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <SignupForm
            closeSignupDialog={closeSignupDialog}
            openLoginDialog={openLoginDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginSignupDialogs;
