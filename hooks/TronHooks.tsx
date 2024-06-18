import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    tronWeb: any;
    tronLink: any;
  }
}

interface TronWeb {
  ready: boolean;
  defaultAddress: {
    base58: string;
    hex: string;
  };
  contract: (abi: any[], contractAddress: string) => any;
}

// Hook to initialize and use TronWeb instance
const useTronWeb = () => {
  const [tronWeb, setTronWeb] = useState<TronWeb | null>(null);

  useEffect(() => {
    const checkTronWeb = () => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWeb(window.tronWeb as TronWeb);
      }
    };

    checkTronWeb();

    const interval = setInterval(checkTronWeb, 1000);
    return () => clearInterval(interval);
  }, []);

  return tronWeb;
};

// Hook to access TronLink wallet details
const useTronLink = () => {
  const tronWeb = useTronWeb();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (tronWeb) {
      setAddress(tronWeb.defaultAddress.base58);
    }
  }, [tronWeb]);

  return { tronWeb, address };
};

export { useTronWeb, useTronLink };
