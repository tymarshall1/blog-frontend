import { ReactNode } from "react";
import { Link } from "react-router-dom";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav className="flex items-center gap-8 p-4 min-h-10 bg-primary text-secondary">
        <Link className="flex-1 text-4xl font-black" to={"/"}>
          Canine Chronicles
        </Link>
        <Link className="text-xl font-semibold" to={"/articles"}>
          Articles
        </Link>
        <Link className="text-xl font-semibold" to={"/about"}>
          About
        </Link>
      </nav>
      <main className="min-h-screen ">{children}</main>
      <footer className="mt-auto text-center text-white bg-primary min-h-10">
        Canine Chronicles
      </footer>
    </>
  );
}

export default Layout;
