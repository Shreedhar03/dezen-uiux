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

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useTronLink();

  return (
    <main className="flex h-[80vh] items-center p-3 sm:p-12">
      <nav className="flex flex-col gap-2 w-2/6">
        <h1>NAVBAR</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          excepturi at obcaecati ex inventore corporis reprehenderit id aliquid
          aperiam cumque, eaque tempore et. Culpa ab reprehenderit distinctio
          repellendus eos eaque.
        </p>
      </nav>
      <div className="shrink-0">{children}</div>
    </main>
  );
};

export default Layout;
