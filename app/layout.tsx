"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Lilita_One } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TronProvider } from "@/components/TronProvider";
import Header from "@/components/header";
import { UserProvider } from "@/components/UserContext";
import React from "react";
import FlareCursor from "@/components/FlareCursor";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const inter = Lilita_One({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({ children, session, ...props }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const styles = `
      ::-webkit-scrollbar { width: 9px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #222; border-radius: 6px; }
      ::-webkit-scrollbar-thumb:hover { background: #333; }
      scrollbar-width: thin;
      scrollbar-color: #222 transparent;
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup the style tag on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TonConnectUIProvider manifestUrl={manifestUrl}>
            <TronProvider>
              <UserProvider>
                {/* <Header /> */}
                <FlareCursor />
                {mounted && children}
              </UserProvider>
            </TronProvider>
          </TonConnectUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
