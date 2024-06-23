"use client";

import React, { use, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { set } from "mongoose";
import profileBg from "../../../../public/profileBg.svg";
import MemeCoinCard from "@/components/MemeCoinCard";
import Loading from "../../launch/loading";
import localFont from "next/font/local";
import ButtonWC from "@/components/ButtonWC";
import Image from "next/image";
import community from "@/public/pepe-council.gif"
import work from "@/public/pepe-working.gif"
import Community from "@/components/Community";

const myFont = localFont({
  src: "../../../../public/fonts/Kavoon-Regular.ttf",
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

export default function UserProfilePage({ params }) {
  const [user, setUser] = useState<User | null>(null);
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);
  const address = params.address;
  const router = useRouter();
  const [iscommunityActive, setCommunityActive] = useState(false)


  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const userResponse = await fetch(`/api/user/${address}`);
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  useEffect(() => {
    if (!address) return;

    const fetchMemecoins = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/memecoin/user/${address}`);
        const data = await response.json();
        console.log("Memecoins: ", data);
        setMemecoins(data);
      } catch (error) {
        console.error("Failed to fetch memecoins: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, [address]);

  return (
    <div className="flex flex-1 pb-1 rounded-3xl mx-6 mt-[1000px] sm:mt-0 ">
      {user && (
        <div className="w-full rounded-3xl">
          <div
            className="relative flex items-center justify-between rounded-[6.5rem] py-36"
            style={{
              backgroundImage: `url(${profileBg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center gap-6 pt-40 absolute -bottom-24 left-12">
              <Avatar className="rounded-full overflow-hidden w-56 h-56 border-4 border-black">
                <AvatarImage
                  className="object-cover w-full h-full"
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${user.profilePicture}`}
                />
              </Avatar>
              <h2
                className={`${myFont.className} text-2xl font-bold ml-6 pt-24`}
              >
                {user.username}
              </h2>
            </div>
          </div>
          <div>
            
          </div>
          <div className="mt-36 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 -mb-[7rem]">
          <div className="flex gap-[5rem]">
              <span onClick={()=>setCommunityActive(false)} > <ButtonWC type={"work"} insideImg={work} width={50} /></span>
             <span onClick={()=>setCommunityActive(true)}> <ButtonWC type={"Community"} insideImg={community} width={120}/> </span>
            
              </div>
              <div></div>
            
            <Image src={community} alt=";t"></Image>
          </div>

          { !iscommunityActive ? <div>
          
          
            {loading && (
              <div
                className="
                flex flex-1 justify-center items-center
              "
              >
                <Loading />
              </div>
            )}
            <div className="mt-36 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
              
              {memecoins.map((memecoin) => (
                <MemeCoinCard
                  key={memecoin.memecoin_address}
                  memecoin={memecoin}
                />
              ))}
            </div>
          </div> : 
          // <Community /> 
          <div>
          
          
            {loading && (
              <div
                className="
                flex flex-1 justify-center items-center
              "
              >
                <Loading />
              </div>
            )}
            <div className="mt-36 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
              
              {memecoins.map((memecoin) => (
                <MemeCoinCard
                  key={memecoin.memecoin_address}
                  memecoin={memecoin}
                />
              ))}
            </div>
          </div>
          }
        </div>
      )}
    </div>
  );
}
