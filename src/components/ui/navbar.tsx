import { Link } from "react-router-dom";
import searchIcon from "../../assets/search-icon.svg";
import { useEffect, useState } from "react";
import closeIcon from "../../assets/close.svg";

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <nav className="flex items-center justify-between p-4 min-h-10 text-primary bg-foreground">
      <Link className="text-4xl font-black hover:text-secondary" to={"/"}>
        LimeLeaf
      </Link>

      {/*render search bar if screen size greater than 640*/}
      {windowWidth > 640 && (
        <div className="relative">
          <img src={searchIcon} alt="" className="absolute top-0 left-0 p-2" />
          <input
            type="search"
            placeholder="Search"
            className="py-2 pl-10 rounded w-60 bg-background"
          />
        </div>
      )}

      <div className="pr-3 space-x-2 sm:space-x-8">
        {/* if search bar has been opened, render only the search bar */}
        {searchOpen ? (
          <>
            <div className="relative flex ml-2">
              <img
                src={searchIcon}
                alt=""
                className="absolute top-0 left-0 p-2"
              />
              <input
                type="search"
                placeholder="Search"
                className="py-2 pl-10 rounded min-w-32 bg-background"
              />
              <img
                src={closeIcon}
                onClick={() => setSearchOpen(false)}
                alt=""
                className="inline-block ml-1"
              />
            </div>
          </>
        ) : (
          <>
            {/* if search bar unopened, render login and sign-up buttons */}
            <Link className="text-xl font-black hover:opacity-50" to={"/"}>
              Login
            </Link>
            <Link
              className="px-2 py-1 text-xl font-black rounded text-foreground bg-secondary hover:opacity-50"
              to={"/"}
            >
              Sign Up
            </Link>
          </>
        )}
        {/* if screen size is less then 640 and search bar unopened, render search icon next to the buttons*/}
        {windowWidth <= 640 && !searchOpen && (
          <img
            onClick={() => setSearchOpen(true)}
            src={searchIcon}
            alt=""
            className="inline-block cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
