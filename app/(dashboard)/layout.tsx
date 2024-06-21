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

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useTronLink();

  return (
    <>
    <Header/>
    <main className="relative flex h-[80vh] items-center p-3 sm:p-12">
      
      
    <Navbar />
    <div className="hidden sm:block absolute top-0 right-0 w-3/4 h-full">
      {children}
    </div>
    <div className="sm:hidden flex-1 ml-4">
      {children}
    </div>
  </main>

  </>
  
  

  );
};

export default Layout;
