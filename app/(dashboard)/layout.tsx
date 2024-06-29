"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTronLink } from "@/hooks/TronHooks";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import LaunchButton from "@/components/ui/LaunchButton";
import PlanetNavbar from "@/components/PlanetNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useTronLink();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Call the function initially to set the initial state

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-[95rem] mx-auto relative flex h-[80vh] items-center p-1 sm:p-12">
        {!isMobile && <Navbar />}

        <div className="hidden sm:block absolute top-0 right-0 w-10/12 h-full">
          {children}
        </div>
        <div className="sm:hidden flex-1">{children}</div>

        <div className="fixed right-10 bottom-5 z-50">
          <LaunchButton />
        </div>

        {isMobile && (
          <div className="fixed z-50 left-10 bottom-[5rem] block sm:hidden">
            <PlanetNavbar />
            {/* <Navbar/> */}
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
