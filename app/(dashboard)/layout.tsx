'use client'

import React, { ReactNode, useState, useEffect, Children, cloneElement } from 'react';
import { Newspaper, PersonStanding, Shapes, Share, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useTronLink } from '@/hooks/TronHooks';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useTronLink();

  return (
    <main className='px-6 py-14 sm:px-10 mx-auto' style={{ maxWidth: '108rem' }}>
      <div className='flex flex-col items-center justify-center'>
        <h1 className="text-6xl font-bold mt-3">
          DEZEN
        </h1>
        {/* <p className="mt-4 max-w-[750px]  text-muted-foreground text-lg sm:text-xl text-center">
          Memecoin Launchpad
        </p> */}
        <div className="mt-6 flex">
          <Button
            variant='destructive'
            className='text-lg'
            onClick={() => router.push('/launch')}
          >
            Launch Memecoin
          </Button>
        </div>
      </div>
      <div className='md:flex min-h-[300px] mt-10'>
        <div className="border border rounded-tl rounded-bl md:w-[230px] pt-3 px-2 pb-8 flex-col flex">
          <Button
            onClick={() => router.push('/')}
            variant={pathname === '/' ? 'secondary' : 'ghost'}
            className="justify-start mb-1">
            <Newspaper size={16} />
            <p className="text-sm ml-2">Explore</p>
          </Button>
          <Button
            onClick={() => router.push('/my-profile')}
            variant={pathname === '/my-profile' ? 'secondary' : 'ghost'}
            className="justify-start mb-1">
            <Shapes size={16} />
            <p className="text-sm ml-2">My Profile</p>
          </Button>
          <Button
            onClick={() => router.push('/launch')}
            className="justify-start mb-1">
            <PersonStanding size={16} />
            <p className="text-sm ml-2">Launch</p>
          </Button>
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
