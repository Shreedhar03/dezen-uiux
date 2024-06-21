import React, { useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOption, setSelectedOption] = useState("explore"); // Default selected option
  const exploreRef = useRef(null);
  const profileRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(".navbar", { scaleX: 1.2, scaleY: 1.2, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    gsap.to(".navbar", { scaleX: 1, scaleY: 1, duration: 0.2 });
  };

  const handleClick = (option) => {
    setSelectedOption(option);
    setIsExpanded(false);
  };

  const handleMouseOverOption = (option) => {
    if (option === "explore") {
      gsap.to(exploreRef.current, { rotation: 0, y: -20, duration: 0.3 });
      gsap.to(profileRef.current, { rotation: 15, y: 0, duration: 0.3 });
    } else if (option === "my-profile") {
      gsap.to(profileRef.current, { rotation: 0, y: -20, duration: 0.3 });
      gsap.to(exploreRef.current, { rotation: -15, y: 0, duration: 0.3 });
    }
  };

  const handleMouseOutOption = () => {
    gsap.to([exploreRef.current, profileRef.current], {
      rotation: 0,
      y: 0,
      duration: 0.3,
    });
  };

  return (
    <nav
      className={`navbar fixed left-0 md:left-0 md:top-1/2 md:-translate-y-1/2 bottom-0 w-64 h-16 md:h-auto md:w-64 md:rounded-r-full transform transition-transform duration-300 bg-primary border-4 border-black md:flex md:items-center md:justify-center`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full flex items-center justify-center md:flex-col">
        <button
          className="md:hidden w-16 h-16 rounded-full bg-primary text-white text-lg flex items-center justify-center border-4 border-black"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Close" : "Menu"}
        </button>
        <h1 className="hidden md:block text-white text-lg transform transition-transform duration-300">
          {isExpanded ? "" : "N"}
        </h1>
        <div
          className={`absolute md:relative flex flex-col items-center gap-4 transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0"
          } md:opacity-100`}
        >
          <Link
            href="/explore"
            ref={exploreRef}
            className={`option ${
              selectedOption === "explore" ? "border-4 border-black" : ""
            } transform transition-transform duration-300 hover:rotate-0 md:hover:rotate-15`}
            onClick={() => handleClick("explore")}
            onMouseOver={() => handleMouseOverOption("explore")}
            onMouseOut={handleMouseOutOption}
          >
            Explore
          </Link>
          <Link
            href="/my-profile"
            ref={profileRef}
            className={`option ${
              selectedOption === "my-profile" ? "border-4 border-black" : ""
            } transform transition-transform duration-300 hover:rotate-0 md:hover:-rotate-15`}
            onClick={() => handleClick("my-profile")}
            onMouseOver={() => handleMouseOverOption("my-profile")}
            onMouseOut={handleMouseOutOption}
          >
            My Profile
          </Link>
        </div>
        {selectedOption && (
          <div
            className="highlight"
            style={{
              transform: `rotate(${
                selectedOption === "explore" ? 15 : -15
              }deg)`,
              backgroundColor: "grey",
              width: "100%",
              height: "2px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transformOrigin: "left",
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
