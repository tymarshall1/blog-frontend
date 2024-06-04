import { ReactNode } from "react";
import Navbar from "./navbar";
import SidebarNav from "./sidebarNav";
import { Toaster } from "@/components/ui/toaster";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <SidebarNav className="hidden min-[1410px]:block" />
      <Navbar />
      <main className="grid min-h-screen mx-auto xl:grid-cols-xlLayout max-w-[2000px] mt-[4.5rem] gap-4">
        <div className=" min-[1410px]:mr-4 lg:col-start-1 lg:col-end-3 min-[1410px]:col-start-2 min-[1410px]:col-end-3">
          {children}
          <Toaster />
        </div>
      </main>
    </>
  );
}

export default Layout;
