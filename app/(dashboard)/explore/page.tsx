"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import local from "next/font/local";
import cardBg from "../../../public/card-bg.png";
import { GlitchHandle, useGlitch } from "react-powerglitch";
import MemeCoinCard from "@/components/MemeCoinCard";
import LoadingSkeleton from "@/components/Loader";
// import AnimateOnRouteChange from "../components/AnimateOnRouteChange";

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

const theme = local({
  src: "../../../public/fonts/docallismeonstreet.otf",
  display: "swap",
});

export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const glitch: GlitchHandle = useGlitch({
    playMode: "always",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 2000,
      easing: "ease-in-out",
    },
    glitchTimeSpan: {
      start: 0.06,
      end: 0.7,
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.2,
      amplitudeY: 0.2,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
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
    
      <div className="mt-[1500px] sm:mt-0 sm:my-20 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch m-3 w-full">
        {loading ? (
          <div className="text-center col-span-3 h-[75vh] flex items-center justify-center">
            <p className={`${theme.className} text-2xl`} >
              <LoadingSkeleton/>
            </p>
          </div>
        ) : (
          memecoins.map((memecoin) => (
            <MemeCoinCard key={memecoin.memecoin_address} memecoin={memecoin} />
          ))
        )}
      </div>
    
  );
}
