"use client"
import { Planet } from 'react-planet';


const CircularButton = ({ children }) => {
    return (
      <button
        
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {children}
      </button>
    );
  };


const PlanetNavbar = () => {
    return (
        <div>
            <Planet
	centerContent={<CircularButton children={"menu"} />}
	hideOrbit
	autoClose
	orbitRadius={60}
	bounceOnClose
	rotation={145}
	// the bounce direction is minimal visible
	// but on close it seems the button wobbling a bit to the bottom
	bounceDirection="BOTTOM"
>
<CircularButton children={"menu"} />
<CircularButton children={"menu"} />
<CircularButton children={"menu"} />
	<div />
	<div />
	<div />
	<div />
</Planet>
        </div>
    );
}



export default PlanetNavbar;