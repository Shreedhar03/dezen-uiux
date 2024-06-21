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
    
  } );

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
      <div className="relative w-screen h-screen overflow-hidden">
        <Image
          src={background}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center" >
          <h1 className={`${myFont.className} text-white text-6xl md:text-8xl lg:text-11xl font-bold mb-8`} 
          ref={glitch.ref}>
            DEZEN
          </h1>
          
          
          <TransitionLink href="/explore" label="explore" >
            <GameButton />
          </TransitionLink>

            
          
          
          
        </div>
      </div>
    </AnimateOnRouteChange>
  );
}
