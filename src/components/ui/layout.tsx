import { ReactNode } from "react";
import Navbar from "./navbar";
import SidebarNav from "./sidebarNav";
import PopularCommunities from "./popularCommunities";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="hidden xl:block">
        <SidebarNav />
      </div>
      <Navbar />
      <main className="grid min-h-screen mx-auto lg:grid-cols-3 xl:grid-cols-xlLayout max-w-[1600px] mt-[4.5rem] gap-4">
        <div className="lg:col-start-1 lg:col-end-3 xl:col-start-2 xl:col-end-3">
          {children}
        </div>
        <div className="hidden lg:col-start-3 lg:col-end-4 md:block">
          <PopularCommunities />
        </div>
      </main>
    </>
  );
}

export default Layout;
