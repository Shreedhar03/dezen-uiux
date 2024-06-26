"use client";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import disc from "@/public/dezenDisc.jpg";
import tiredmnky from "@/public/tiredmnky.png";
import exploreMnky from "@/public/exploreMnky.jpeg";

const CurrentPage = ({ hovered, setHovered }) => {
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const segments = cleanedPathname.split("/");
  const result = segments[0];
  console.log("cleanedPathname", cleanedPathname);
  const routes = ["explore", "profile"];

  const optionRef = useRef(null);
  const rotateRef = useRef(null);
  const discRef1 = useRef(null);
  const discRef2 = useRef(null);
  const discRef3 = useRef(null);
  const discRef4 = useRef(null);
  const discRef5 = useRef(null);
  const discRef6 = useRef(null);
  const [mouseDown, setMouseDown] = React.useState(0);

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

  useEffect(() => {
    const rotationDuration = 15;
    const equalAngle = 360 / 6;

    gsap.set(discRef1.current, { rotate: 0 });
    gsap.set(discRef2.current, { rotate: equalAngle });
    gsap.set(discRef3.current, { rotate: 2 * equalAngle });
    gsap.set(discRef4.current, { rotate: 3 * equalAngle });
    gsap.set(discRef5.current, { rotate: 4 * equalAngle });
    gsap.set(discRef6.current, { rotate: 5 * equalAngle });

    gsap.to([discRef1.current, discRef2.current, discRef3.current, discRef4.current, discRef5.current, discRef6.current], {
      rotate: "+=720",
      duration: rotationDuration,
      ease: "none",
      repeat: -1,
      transformOrigin: "left center",
    });
  }, []);

  return (
    <div
      className="fixed hidden lg:block"
      onMouseEnter={() => setHovered(true)}
      ref={optionRef}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href="/explore">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-800 transform translate-x-3 border-4  border-black origin-left flex items-center justify-center"
          ref={discRef1}
        >
          <p className="text-3xl font-semibold">explore</p>
        </div>
      </Link>
      <Link href="/my-profile">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform translate-x-3 border-4  border-black flex items-center justify-center"
          ref={discRef2}
        >
          <p className="text-3xl font-semibold">my-profile</p>
        </div>
      </Link>
      <Link href="/launch">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform translate-x-3 border-4 border-black flex items-center justify-center"
          ref={discRef3}
        >
          <p className="text-3xl font-semibold">launch</p>
        </div>
      </Link>
      <Link href="/explore">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-800 transform translate-x-3 border-4  border-black origin-left flex items-center justify-center"
          ref={discRef4}
        >
          <p className="text-3xl font-semibold">explore</p>
        </div>
      </Link>
      <Link href="/my-profile">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform translate-x-3 border-4  border-black flex items-center justify-center"
          ref={discRef5}
        >
          <p className="text-3xl font-semibold">my-profile</p>
        </div>
      </Link>
      <Link href="/launch">
        <div
          className="fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform translate-x-3 border-4 border-black flex items-center justify-center"
          ref={discRef6}
        >
          <p className="text-3xl font-semibold">launch</p>
        </div>
      </Link>
    </div>
  );
};

const NavSection = () => {
  return (
    <>
      <div className="fixed left-0 w-[50%] h-[50%] bg-slate-500 rounded-1/2 transform -translate-x-[40%] border-4 border-black"></div>
      <div className="fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 rotate-[15deg] origin-left border-black">
        <p className="fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2">
          Explore
        </p>
      </div>
      <div className="fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 -rotate-[15deg] origin-left border-black">
        <p className="fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2">
          Explore
        </p>
      </div>
    </>
  );
};

const Navbar = () => {
  const [hovered, setHovered] = React.useState(false);
  const navRef = useRef(null);
  const discRef = useRef(null);
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;

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
      {/* {hovered && <NavSection />} */}
      <div
        ref={navRef}
        className="hidden lg:block fixed left-0 w-[18%] h-[34%] rounded-1/2 transform -translate-x-1/2 border-4 border-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          ref={discRef}
          src={disc}
          alt="disc"
          className="fixed -translate-y-6 rounded-r-full rounded-l-full"
        ></Image>
      </div>
      {hovered && <CurrentPage hovered={hovered} setHovered={setHovered} />}
      {!hovered && <Player />}
    </>
  );
};

export default Navbar;
