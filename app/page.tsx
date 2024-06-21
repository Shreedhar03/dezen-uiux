"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import Image from "next/image";
import pepe from "@/public/pepe.png";
import background from "@/public/glitch.webp";
import { useGlitch, GlitchHandle } from "react-powerglitch";
import localFont from "next/font/local";

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
    playMode: "always", // Can be 'always', 'hover', 'click', or 'manual'
    hideOverflow: false,
    timing: {
      duration: 1000,
      iterations: 15,
      easing: "ease-in-out",
    },
    glitchTimeSpan: {
      start: 0.4,
      end: 0.7,
    },
    shake: {
      velocity: 10,
      amplitudeX: 0.4,
      amplitudeY: 0.4,
    },
    slice: {
      count: 4,
      velocity: 10,
      minHeight: 0.02,
      maxHeight: 0.4,
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
          <h1 className={`${myFont.className} text-white text-6xl md:text-8xl lg:text-9xl font-bold mb-8`} {...glitch.triggerProps}
          ref={glitch.ref}>
            DEZEN
          </h1>
          <button
            className="px-8 py-4 text-xl font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-800 transition-colors"
            onClick={() => router.push('/explore')}
          >
            Explore
          </button>
        </div>
      </div>
    </AnimateOnRouteChange>
  );
}
