"use client";
import Image from "next/image";
import "./ui/GameButton.css";
import pepe from "@/public/pepe.png";

const ButtonWC = ({ type, insideImg, width }) => {
  return (
    <div>
      <button className="game-button flex w-[110%] bg-black text-xs sm:text-xl">
        {" "}
        {type} <Image src={insideImg} alt="" width={width}></Image>
      </button>
    </div>
  );
};

export default ButtonWC;
