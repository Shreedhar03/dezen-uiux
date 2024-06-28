import React, { useEffect, useRef } from "react";
import local from "next/font/local";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import './MemeCoinCard.css';
import {  GlobeIcon, InstagramIcon, TwitterIcon } from "lucide-react";



const kanit = local({
  src: "../public/fonts/kanit.ttf",
  display: "swap",
});
const pokemon = local({
  src: "../public/fonts/PokemonHollow.ttf",
  display: "swap",
});

const theme = local({
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
  creator?: User;
}

const MemeCoinCard = ({ memecoin }: { memecoin: Memecoin }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: -50, opacity: 0, rotation: -10 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  return (
    <CardContainer className="h-[80%] mx-4 border-[6px] border-white   shadow-md hover:shadow-cpurplelight rounded-3xl">
    <CardBody>
      <div
        key={memecoin.memecoin_address}
        className={`card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 h-full relative p-2 md:p-4 rounded-xl flex flex-col justify-between gap-2 md:gap-3 cursor-pointer transform hover:scale-105 transition-transform duration-500 border-10 border-gold border-opacity-50 shadow-lg`}
        onClick={() => router.push(`/${memecoin.memecoin_address}`)}
        ref={cardRef}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-md pointer-events-none px-3"></div>
        <div className="card bg-purple-950 rounded px-2 py-1  text-sm text-white flex  justify-around">
              {/* Market Cap: ${memecoin.marketCap ? memecoin.marketCap.toLocaleString() : "N/A"} */}
              <div className="card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-2">Market Cap: $20</div>  
              <div className="card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-2">
                  Ticker: {memecoin.ticker}
              </div>
            </div>
      <div></div>
      <div className="flex w-full justify-center">
        <CardItem translateZ={50} className="z-50">
          <div className="flex justify-between items-center">
            <h2
              className={`text-lg md:text-2xl font-bold mt-1 md:mt-2 text-white text-center ${pokemon.className}`}
              style={{ textShadow: "1px 1px 0 #000" }}
            >
              {memecoin.name}
            </h2>
            
            
          </div>
        </CardItem>
        </div>
        <div className="card flex w-full justify-center h-[40%] mb-2">
        <CardItem translateZ={50} className=" z-50 flex justify-center">
          <img
            src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
            className="w-full object-cover rounded-md border-4 border-purple-300 shadow-xl"
            alt={memecoin.name}
            
          />
        </CardItem>
        </div>
        <div className="w-full border-2 border-purple-300 rounded p-2 card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
        <CardItem translateZ={50} className="z-50">
          <p className={`leading-6 text-white text-sm md:text-base italic font-light ${kanit.className}`}>
            {memecoin.description}
          </p>
         
        </CardItem>
        </div>
        <CardItem
          translateZ={50}
          className="flex gap-1 items-center cursor-pointer z-50"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${memecoin.creator_address}`);
          }}
        >
          <div className="flex flex-row justify-evenly">
            <div className="card flex flex-row justify-around gap-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-2">
            {memecoin.creator && (
              <img
                src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator?.profilePicture}`}
                alt={`${memecoin.creator?.username}'s profile`}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-300"
              />
            )}
            
            <p className={`mt-1 underline underline-offset-1 md:underline-offset-2 text-white text-xs md:text-lg ${kanit.className}`}>
              {memecoin.creator?.username}
            </p>
            </div>
            
          </div>
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
  );
};

export default MemeCoinCard;
