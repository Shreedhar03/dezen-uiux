import { ChevronRight, Droplets, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/dropdown";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";

import { TonConnectButton } from "@tonconnect/ui-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { connected, address } = useWallet();

  return (
    <nav className="flex flex-col sm:flex-row items-start sm:items-center py-8 px-3 sm:px-12">
      <div className="flex flex-1 items-center">
        <Link href="/" className="flex items-center">
          <p className={`text-3xl font-semibold`}>DEZEN</p>
        </Link>
      </div>
      <div className="flex sm:items-center pl-8 pb-3 sm:p-0 gap-2">
        {/* <WalletActionButton>
          {!connected ? "Connect Tron" : null}
        </WalletActionButton> */}
        {/* <TonConnectButton /> */}
        <button className="text-2xl">Connect Wallet</button>
        {/* <ModeToggle /> */}
      </div>
    </nav>
  );
}
