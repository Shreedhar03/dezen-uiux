import React, { useEffect, useRef } from "react";
import local from "next/font/local";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import './MemeCoinCard.css'

const kanit = local({
  src: "../public/fonts/kanit.ttf",
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
    <CardContainer className="h-full mx-4 md:mx-8 shadow-md hover:shadow-cpurplelight rounded-xl">
      <CardBody>
        <div
          key={memecoin.memecoin_address}
          className={`${kanit.className} card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 h-full relative p-2 md:p-4 rounded-xl flex flex-col justify-between gap-2 md:gap-3 cursor-pointer transform hover:scale-105 transition-transform duration-500`}
          onClick={() => router.push(`/${memecoin.memecoin_address}`)}
          ref={cardRef}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-md pointer-events-none"></div>

          <CardItem translateZ={50} className="z-50">
            <h2
              className={`text-lg md:text-2xl font-bold mt-1 md:mt-2 text-white text-center`}
              style={{ textShadow: "1px 1px 0 #000" }}
            >
              {memecoin.name}
            </h2>
          </CardItem>

          <CardItem translateZ={50} className="z-50 flex justify-center">
            <img
              src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
              className="w-[40%] md:w-[40%] object-cover rounded-md border-4 border-purple-300"
            />
          </CardItem>

          <CardItem translateZ={50} className="z-50">
            <p className="leading-5   text-white/80 text-sm md:text-base">
              {memecoin.description}
            </p>
          </CardItem>

          <CardItem
            translateZ={50}
            className="flex gap-1 items-center cursor-pointer z-50"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/profile/${memecoin.creator_address}`);
            }}
          >
            {memecoin.creator && (
              <img
                src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator?.profilePicture}`}
                alt={`${memecoin.creator?.username}'s profile`}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-300"
              />
            )}
            <p className="mt-1 underline underline-offset-1 md:underline-offset-2 text-white text-xs md:text-sm">
              {memecoin.creator?.username}
            </p>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default MemeCoinCard;
