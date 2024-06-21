"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import localFont from "next/dist/compiled/@next/font/dist/local";
import local from "next/font/local";
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
              className={`${kanit.className} bg-secondary p-4 rounded-2xl flex flex-col justify-between gap-3`}
            >
              <div>
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
                  className="h-48 w-full object-cover rounded-2xl"
                />
                <h2 className={`${theme.className} text-2xl font-bold mt-2`}>
                  {memecoin.name}
                </h2>
                <p className="mt-2">${memecoin.ticker}</p>
                <p className="leading-5 mt-2">{memecoin.description}</p>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator.profilePicture}`}
                  alt={memecoin.name}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-sm mt-1">{memecoin.creator.username}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </AnimateOnRouteChange>
  );
}
