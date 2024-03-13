import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
