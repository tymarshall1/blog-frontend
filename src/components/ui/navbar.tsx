import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import closeIcon from "../../assets/close.svg";
import leafLogo from "../../assets/leaf-logo.svg";
import SidebarNav from "./sidebarNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/forms/login";
import SignupForm from "@/forms/signup";
import { useContext } from "react";
import { userContext } from "@/contexts/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth > 640) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

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
    <nav className="fixed top-0 z-50 flex items-center justify-between w-full p-4 min-h-10 text-primary bg-foreground">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger className="place-self-end">
            <span className="text-3xl cursor-pointer material-symbols-outlined xl:hidden hover:text-secondary">
              menu
            </span>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SidebarNav />
          </SheetContent>
        </Sheet>

        <Link to={""}>
          <img src={leafLogo} className="w-10 h-10 " alt="" />
        </Link>
        <Link
          className="hidden text-4xl font-black hover:text-secondary sm:block"
          to={"/"}
        >
          LimeLeaf
        </Link>
      </div>

      {/*render search bar if screen size greater than 640*/}
      {windowWidth > 640 && (
        <div className="relative">
          <span className="absolute top-0 left-0 p-2 material-symbols-outlined">
            search
          </span>
          <input
            type="search"
            placeholder="Search"
            className="py-2 pl-10 rounded-full sm:w-48 md:w-80 lg:w-96 bg-background"
          />
        </div>
      )}

      <div className="flex items-center gap-2 pr-3 sm:gap-8">
        {/* if search bar has been opened, render only the search bar */}
        {searchOpen ? (
          <>
            <div className="relative flex ml-2">
              <span className="absolute top-0 left-0 p-2 material-symbols-outlined">
                search
              </span>
              <input
                type="search"
                placeholder="Search"
                className="py-2 pl-10 rounded bg-background"
              />
              <img
                src={closeIcon}
                onClick={() => setSearchOpen(false)}
                alt=""
                className="inline-block ml-1 cursor-pointer"
              />
            </div>
          </>
        ) : (
          <>
            {/* if search bar unopened and user is logged in, render user icon */}
            {isLoggedIn && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-10 h-10 bg-white rounded-full"></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="text-lg font-semibold">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-normal text-md">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-normal text-md">
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-normal text-md">
                      Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-normal text-md">
                      Subscription
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-normal text-md"
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        setIsLoggedIn(false);
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {/* if search bar unopened, render login and sign-up buttons */}
            {!isLoggedIn && (
              <>
                <Dialog
                  open={isLoginDialogOpen}
                  onOpenChange={setIsLoginDialogOpen}
                >
                  <DialogTrigger
                    className="text-xl font-black hover:text-secondary"
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

                <Dialog
                  open={isSignupDialogOpen}
                  onOpenChange={setIsSignupDialogOpen}
                >
                  <DialogTrigger
                    className="px-2 py-1 text-xl font-black rounded text-foreground bg-secondary hover:bg-primary hover:text-secondary"
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
              </>
            )}
          </>
        )}
        {/* if screen size is less then 640 and search bar unopened, render search icon next to the buttons*/}
        {windowWidth <= 640 && !searchOpen && (
          <span
            onClick={() => setSearchOpen(true)}
            className="inline-block text-3xl cursor-pointer material-symbols-outlined"
          >
            search
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
