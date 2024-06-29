"use client"
import Link from 'next/link';
import { Planet } from 'react-planet';
import disc from "@/public/dezenDisc.jpg";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import tiredmnky from '@/public/tiredmnky.png';
import exploreMnky from "@/public/exploreMnky.jpeg";
import rocket from "@/public/NavRocket.jpg";

const CircularButton = ({ children, to, navImg, angle }) => {
    return (
        <>
            <Link href={to}>
                <button 
                    className={`relative bg-cpurpledark transform translate-y-[5rem] -rotate-${angle} hover:bg-blue-700 z-50 text-white font-bold py-4 px-4 rounded-full w-[8rem] h-15 overflow-hidden`}
                >
                    <Image
                        src={navImg}
                        alt="nav image"
                        className="absolute inset-0 object-cover w-full h-full"
                        style={{ filter: "blur(2px)" }}
                    />
                    <p
                        className={`card-name text-2xl font-semibold absolute inset-0 flex items-center justify-center text-white`}
                        style={{
                            textShadow:
                                "2px 2px 1px #6a0dad, -2px 2px 1px #6a0dad, 2px -2px 1px #6a0dad, -2px -2px 1px #6a0dad, 0px 2px 1px #6a0dad, 0px -2px 1px #6a0dad, 0px 4px 1px #4b0082, 2px 4px 1px #4b0082, -2px 4px 1px #4b0082",
                        }}
                    >
                        {children}
                    </p>
                </button>
            </Link>
        </>
    );
};

const LaunchButton = ({ children, to, navImg }) => {
    return (
        <>
            <Link href={to}>
                <button 
                    className={`relative bg-cpurpledark transform translate-y-[5rem] -rotate-90 hover:bg-blue-700 z-50 text-white font-bold py-4 px-4 rounded-full w-[8rem] h-15 overflow-hidden`}
                >
                    <Image
                        src={navImg}
                        alt="nav image"
                        className="absolute inset-0 object-cover w-full h-full"
                        style={{ filter: "blur(2px)" }}
                    />
                    <p
                        className={`card-name text-2xl font-semibold absolute inset-0 flex items-center justify-center text-white`}
                        style={{
                            textShadow:
                                "2px 2px 1px #6a0dad, -2px 2px 1px #6a0dad, 2px -2px 1px #6a0dad, -2px -2px 1px #6a0dad, 0px 2px 1px #6a0dad, 0px -2px 1px #6a0dad, 0px 4px 1px #4b0082, 2px 4px 1px #4b0082, -2px 4px 1px #4b0082",
                        }}
                    >
                        {children}
                    </p>
                </button>
            </Link>
        </>
    );
};

const MainButton = ({ children, onClick }) => {
    return (
        <>
            <button
                className="bg-cpurpledark hover:bg-blue-700 text-white font-normal py-4 px-4 rounded-full w-20 h-20 z-50"
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
};

const Disc = ({ onClose }) => {
    const discRef = useRef(null) ;

    useEffect(() => {
        gsap.to(discRef.current, {
            rotate: 360,
            duration: 5,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center",
        });

        const handleClickOutside = (event) => {
            if (discRef.current && !discRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className='fixed left-0 bottom-0 z-40 rounded-full transform -translate-x-1/2 translate-y-1/2'>
            <Image
                ref={discRef}
                src={disc}
                alt="disc"
                className="rounded-r-full rounded-l-full bg-cover"
            />
        </div>
    );
};

const PlanetNavbar = () => {
    const [showDisc, setShowDisc] = useState(false);

    const toggleDisc = () => {
        setShowDisc(!showDisc);
    };

    return (
        <div>
            <div className='relative z-50 bottom-8  '>
                <Planet
                    centerContent={showDisc ? null : <MainButton children={"menu"} onClick={toggleDisc} />}
                    hideOrbit
                    autoClose
                    orbitRadius={100}
                    bounceOnClose
                    rotation={145}
                    bounceDirection="BOTTOM"
                >
                    <LaunchButton children={"launch"} to={"/launch"} navImg={rocket} />
                    <CircularButton children={"explore"} to={"/explore"} navImg={exploreMnky} angle={45} />
                    <CircularButton children={"profile"} to={"/my-profile"} navImg={tiredmnky} angle={0} />
                    <div />
                    <div />
                    <div />
                    <div />
                </Planet>
            </div>
            {showDisc && <Disc onClose={toggleDisc} />}
        </div>
    );
};

export default PlanetNavbar;
