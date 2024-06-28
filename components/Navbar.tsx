"use client";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import disc from "@/public/dezenDisc.jpg";
import tiredmnky from "@/public/tiredmnky.png";
import exploreMnky from "@/public/exploreMnky.jpeg";
import rocket from "@/public/NavRocket.jpg";
import { useState } from "react";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/fonts/font.ttf",
  display: "swap",
});

const CurrentPage = ({ hovered, setHovered }) => {
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;
  const segments = cleanedPathname.split("/");
  const result = segments[0];
  const routes = ["explore", "profile"];

  const optionRef = useRef(null);
  const rotateRef = useRef(null);

  const [mouseDown, setMouseDown] = React.useState(0);
  const [linkHovered, setLinkHovered] = React.useState(false);

  useEffect(() => {
    if (mouseDown === 1) {
      gsap.to(rotateRef.current, {
        rotate: 45,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        transformOrigin: "left center",
      });
    } else {
      gsap.to(rotateRef.current, {
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        transformOrigin: "left center",
      });
    }
  }, [mouseDown]);

  useEffect(() => {
    if (hovered) {
      gsap.to(optionRef.current, {
        width: "38%",
        height: "74%",
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(optionRef.current, {
        width: "18%",
        height: "34%",
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  const handleMouseEnter = () => {
    setLinkHovered((prev) => !prev);
  };

  return (
    <div
      className={`fixed hidden lg:block font-sans`}
      onMouseEnter={() => setHovered(true)}
      ref={optionRef}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href="/my-profile">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseEnter}
          className={`${
            !linkHovered ? "blur-0" : "blur-sm"
          } fixed hover:blur-none hover:scale-105 scale-100 transition-all left-0 bottom-[40%] w-[20%] h-[10%] transform border-4 -rotate-45 origin-left border-black flex items-center justify-center overflow-hidden`}
        >
          <Image
            src={tiredmnky}
            alt="tiredmnky"
            style={{ objectFit: "contain", filter: "blur(2px)" }}
            className="fixed"
          />
          <p
            className={`${myFont.className} text-3xl font-semibold fixed text-white`}
            style={{
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            my-profile
          </p>
        </div>
      </Link>
      <Link href="/launch">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseEnter}
          className={`${
            !linkHovered ? "blur-0" : "blur-sm"
          } hover:blur-none hover:scale-105 scale-100 transition-all fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform border-4 rotate-45 origin-left border-black flex items-center justify-center overflow-hidden`}
        >
          <Image
            src={rocket}
            alt="rocket"
            style={{ objectFit: "contain", filter: "blur(2px)" }}
            className="fixed"
          />
          <p
            className={`${myFont.className} text-3xl font-semibold fixed text-white`}
            style={{
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            launch
          </p>
        </div>
      </Link>
      <Link href="/explore">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseEnter}
          className={`${
            !linkHovered ? "blur-0" : "blur-sm"
          } hover:blur-none hover:scale-105 scale-100 transition-all fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-800 transform border-4 border-black origin-left flex items-center justify-center overflow-hidden`}
        >
          <Image
            src={exploreMnky}
            alt="exploreMnky"
            style={{ objectFit: "contain", filter: "blur(2px)" }}
            className="fixed"
          />
          <p
            className={`${myFont.className} text-3xl font-semibold fixed text-white`}
            style={{
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            explore
          </p>
        </div>
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [hovered, setHovered] = React.useState(false);
  const navRef = useRef(null);
  const discRef = useRef(null);
  const [isScreenTall, setIsScreenTall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenTall(window.innerHeight > 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (hovered) {
      gsap.to(navRef.current, {
        width: "38%",
        height: "74%",
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    } else {
      gsap.to(navRef.current, {
        width: "18%",
        height: "34%",
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [hovered]);

  useEffect(() => {
    gsap.to(discRef.current, {
      rotate: 360,
      duration: 5,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });
  }, []);

  const Player = () => {
    const pathname = usePathname();
    const cleanedPathname = pathname.startsWith("/")
      ? pathname.slice(1)
      : pathname;
    const routes: StaticImageData[] = [exploreMnky, tiredmnky];
    let routeImg: StaticImageData = tiredmnky;
    if (cleanedPathname == "explore") {
      routeImg = routes[1];
    } else {
      routeImg = routes[0];
    }

    return (
      <>
        <div className="hidden lg:flex fixed left-0 bottom-[40%] w-[10%] h-[10%] bg-orange-500 transform -translate-x-3 translate-y-2 border-4 border-black origin-left items-center justify-center overflow-hidden">
          <Image
            src={routeImg}
            alt="tiredmnky"
            style={{ objectFit: "contain" }}
          ></Image>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        ref={navRef}
        className={`hidden lg:block fixed left-0 w-[18%] h-[34%] rounded-1/2 transform -translate-x-1/2  ${
          isScreenTall ? "xl:translate-y-[4rem]" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          ref={discRef}
          src={disc}
          alt="disc"
          className="fixed -translate-y-3 rounded-r-full rounded-l-full bg-cover"
        ></Image>
      </div>
      <div className="fixed left-0">
        {hovered && <CurrentPage hovered={hovered} setHovered={setHovered} />}
        {!hovered && <Player />}
      </div>
    </>
  );
};

export default Navbar;
