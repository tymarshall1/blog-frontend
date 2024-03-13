import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import SidebarNav from "./sidebarNav";
import PopularCommunities from "./popularCommunities";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="grid min-h-screen mx-auto md:grid-cols-4 max-w-[1920px]">
        <div className="hidden lg:col-start-1 lg:col-end-2 lg:block">
          <SidebarNav />
        </div>
        <div>{children}</div>
        <div className="hidden md:col-start-4 md:col-end-5 md:block">
          <PopularCommunities />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
