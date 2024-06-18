import { ChevronRight, Droplets, LogOut } from "lucide-react";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/dropdown';
import { useRouter, usePathname } from 'next/navigation';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

import { TonConnectButton } from '@tonconnect/ui-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { connected, address } = useWallet();

  return (
    <nav className='border-b flex flex-col sm:flex-row items-start sm:items-center sm:pr-10'>
      <div className='py-3 px-8 flex flex-1 items-center'>
        <Link href="/" className='mr-5 flex items-center'>
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>DEZEN</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
      </div>
      <div className='flex sm:items-center pl-8 pb-3 sm:p-0 gap-2'>
        {/* <WalletActionButton>
          {!connected ? "Connect Tron" : null}
        </WalletActionButton> */}
        <TonConnectButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
