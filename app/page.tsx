"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import Image from "next/image";
import pepe from "@/public/pepe.png";
import background from "@/public/bgan2.webp";
import { useGlitch, GlitchHandle } from "react-powerglitch";
import localFont from "next/font/local";
import TransitionLink from "@/components/TransitionLink";
import GameButton from "@/components/ui/GameButton";
import dezenP from "@/public/dezenP.png";
import Vimeo from "@u-wave/react-vimeo";

const myFont = localFont({
  src: "../public/fonts/docallismeonstreet.otf",
  display: "swap",
});

interface User {
  address: string;
  username: string;
  profilePicture?: string;
  bio?: string;
}

interface Memecoin {
  memecoin_address: string;
  creator_address: string;
  logo: string;
  name: string;
  ticker: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  timestamp: Date;
  creator: User;
}

export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const glitch: GlitchHandle = useGlitch({
    "playMode": "always",
    "createContainers": true,
    "hideOverflow": false,
    "timing": {
      "duration": 2000,
      "easing": "ease-in-out"
    },
    "glitchTimeSpan": {
      "start": 0.06,
      "end": 0.7
    },
    "shake": {
      "velocity": 15,
      "amplitudeX": 0.2,
      "amplitudeY": 0.2
    },
    "slice": {
      "count": 6,
      "velocity": 15,
      "minHeight": 0.02,
      "maxHeight": 0.15,
      "hueRotate": true
    },
  });

  useEffect(() => {
    const fetchMemecoins = async () => {
      try {
        const response = await fetch("/api/memecoin/all/f");
        const data = await response.json();
        console.log("Memecoins: ", data);
        setMemecoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, []);

  return (
    <AnimateOnRouteChange>
      <div className="loader-container w-full h-screen fixed inset-0 flex justify-center items-center flex-col box-border relative">
        <style jsx>{`
          .loader-container::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            border: 6px solid #800080; /* Purple border */
            box-shadow: inset 0 0 20px 10px rgba(128, 0, 128, 0.5); /* Purple glow */
            z-index: 1;
          }
        `}</style>
        <Vimeo
          className="absolute z-0 w-full h-full inset-0 vimeo-style"
          video="https://vimeo.com/769892438"
          autoplay
          loop
          background
          responsive
          style={{ minHeight: "100vh", minWidth: "177.77vh" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
          <Image
            width={500}
            src={dezenP}
            alt="logo"
            ref={glitch.ref}
          />
          <TransitionLink href="/explore" label="explore">
            <GameButton />
          </TransitionLink>
        </div>
      </div>
    </AnimateOnRouteChange>
  );
}
