"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import localFont from "next/dist/compiled/@next/font/dist/local";
import local from "next/font/local";
import cardBg from "../../../public/card-bg.png";
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

const kanit = local({
  src: "../../../public/fonts/kanit.ttf",
  display: "swap",
});
const theme = local({
  src: "../../../public/fonts/docallismeonstreet.otf",
  display: "swap",
});

export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 mx-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 size={32} />
          </div>
        ) : (
          memecoins.map((memecoin) => (
            <div
              key={memecoin.memecoin_address}
              className={`${kanit.className} relative p-4 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer`}
              onClick={() => router.push(`/${memecoin.memecoin_address}`)}
              style={{
                backgroundImage: `url(${cardBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* black overlay bg */}

              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 rounded-2xl"></div>

              <div className="z-50">
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
                  className="h-48 w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-200 ease-in-out"
                />
                <h2
                  className={`${theme.className} text-2xl font-bold mt-2 text-white`}
                >
                  {memecoin.name}
                </h2>
                <p className="mt-2 text-white">${memecoin.ticker}</p>
                <p className="leading-5 mt-2 text-white">
                  {memecoin.description}
                </p>
              </div>
              <div
                className="flex gap-1 items-center cursor-pointer z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/profile/${memecoin.creator_address}`);
                }}
              >
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator.profilePicture}`}
                  alt={`${memecoin.creator.username}'s profile`}
                  className="w-12 h-12 rounded-full"
                />
                <p className="mt-1 underline underline-offset-2 text-white">
                  {memecoin.creator.username}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </AnimateOnRouteChange>
  );
}
