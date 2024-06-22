import React from "react";
import local from "next/font/local";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";
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
  creator: User;
}

const MemeCoinCard = ({ memecoin }: { memecoin: Memecoin }) => {
  const router = useRouter();
  return (
    <>
      <CardContainer className="h-full mx-8 shadow-md hover:shadow-cpurplelight rounded-xl">
        <CardBody>
          <div
            key={memecoin.memecoin_address}
            className={`${kanit.className} bg-secondary h-full relative p-4 rounded-xl flex flex-col justify-between gap-3 cursor-pointer`}
            onClick={() => router.push(`/${memecoin.memecoin_address}`)}
            style={
              {
                // backgroundImage: `url(${cardBg.src})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
              }
            }
          >
            {/* black overlay bg */}

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 rounded-md"></div>

            <CardItem translateZ={50} className="z-50">
              <div className="flex gap-4">
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
                  className="h-24 w-24 object-cover rounded-full"
                />
                <div>
                  <h2
                    className={`text-2xl font-bold mt-2 text-cpurpledark`}
                    style={{ textShadow: "2px 2px 0 #000" }}
                  >
                    {memecoin.name}
                  </h2>
                  <p className="mt-2 text-foreground">${memecoin.ticker}</p>
                </div>
              </div>
              <p className="leading-5 mt-2 text-foreground/60">
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
              <img
                src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator.profilePicture}`}
                alt={`${memecoin.creator.username}'s profile`}
                className="w-12 h-12 rounded-full"
              />
              <p className="mt-1 underline underline-offset-2 text-foreground">
                {memecoin.creator.username}
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
};

export default MemeCoinCard;
