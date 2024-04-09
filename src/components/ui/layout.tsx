import { ReactNode } from "react";
import Navbar from "./navbar";
import SidebarNav from "./sidebarNav";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <SidebarNav className="hidden xl:block" />
      <Navbar />
      <main className="grid min-h-screen mx-auto xl:grid-cols-xlLayout max-w-[2000px] mt-[4.5rem] gap-4">
        <div className="lg:col-start-1 lg:col-end-3 xl:col-start-2 xl:col-end-3">
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;
