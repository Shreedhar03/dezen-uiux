"use client";

import React, {
  ReactNode,
  useState,
  useEffect,
  Children,
  cloneElement,
} from "react";
import {
  Newspaper,
  PersonStanding,
  Shapes,
  Share,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useTronLink } from "@/hooks/TronHooks";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import GameButton from "@/components/ui/GameButton";
import LaunchButton from "@/components/ui/LaunchButton";
import PlanetNavbar from "@/components/PlanetNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useTronLink();

  return (
    <>
      <Header />
      <main className="max-w-[95rem] mx-auto relative flex h-[80vh] items-center justify-center p-3 lg:p-12">
        <Navbar />

        <div className="hidden sm:block absolute top-0 right-0 w-full lg:w-10/12 h-full">
          {children}
        </div>
        <div className="sm:hidden flex-1">{children}</div>
        <div className="fixed right-10 bottom-5 z-50">
          <LaunchButton />
        </div>
        <div className="fixed left-10 bottom-[5rem] block lg:hidden">
          <PlanetNavbar />
        </div>
      </main>
    </>
  );
};

export default Layout;
