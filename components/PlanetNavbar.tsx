"use client"
import Link from 'next/link';
import { Planet } from 'react-planet';


const CircularButton = ({ children, to }) => {
    return (
        <>
        <Link href={to}>
            <button
                
                className="bg-cpurpledark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                {children}
            </button>
        </Link>
      </>
    );
  };
const MainButton = ({ children }) => {
    return (
        <>
        
      <button
        
        className="bg-cpurpledark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {children}
      </button>
      </>
    );
  };


const PlanetNavbar = () => {
    return (
        <div>
            <Planet
	centerContent={<MainButton children={"menu"} />}
	hideOrbit
	autoClose
	orbitRadius={60}
	bounceOnClose
	rotation={145}
	// the bounce direction is minimal visible
	// but on close it seems the button wobbling a bit to the bottom
	bounceDirection="BOTTOM"
>
<CircularButton children={"launch"} to={"/launch"} />
<CircularButton children={"explore"} to={"/explore"} />
<CircularButton children={"my-profile"} to={"/my-profile"}/>
	<div />
	<div />
	<div />
	<div />
</Planet>
        </div>
    );
}



export default PlanetNavbar;