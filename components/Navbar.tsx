"use client"
import { usePathname } from 'next/navigation';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import disc from '@/public/disc.webp'
import tiredmnky from '@/public/tiredmnky.png'
import exploreMnky from '@/public/exploreMnky.jpeg'




const CurrentPage = ({ hovered, setHovered }) => {
  const pathname = usePathname();
  let cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  let segments = cleanedPathname.split('/');
  let result = segments[0];
  console.log("cleanedPathname", cleanedPathname)
  const routes: string[] = ['explore', 'profile'];
  
  
  let otherRoute: string | null = null;

  if (routes.includes(result)) {
    otherRoute = routes.find(route => route !== result) || null;
  }

  if (result == "launch"){
    result = "explore" 
    otherRoute = "profile"
  }

  const optionref = useRef(null);
  const rotateref = useRef(null);
  const [mouseDown, setMouseDown] = React.useState(0);
  

  useEffect(() => {
    if (mouseDown==1) {
      gsap.to(rotateref.current, {
        rotate: 45,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    } else {
      gsap.to(rotateref.current, {
        rotate: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  }, [mouseDown]);
  useEffect(() => {
    if (hovered) {
      gsap.to(optionref.current, {
        width: '38%',
        height: '74%',
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    } else {
      gsap.to(optionref.current, {
        width: '18%',
        height: '34%',
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  }, [hovered]);

  return (
    <div className='fixed' onMouseEnter={() => setHovered(true)} ref={optionref} >
      <Link href='/explore'>
        <div className='fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-800 transform -translate-x-3  border-4 border-black origin-left flex items-center justify-center'>
          <p className='text-3xl font-semibold'>{result}</p>
        </div>
      </Link>
      <Link href='/my-profile'>
        <div className='fixed left-0 bottom-[40%] w-[20%] h-[10%] bg-zinc-600 transform -translate-x-10 translate-y-10 border-4 rotate-[35deg] origin-left border-black flex items-center justify-center'>
          <p className='text-3xl font-semibold'>{otherRoute}</p>
        </div>
      </Link>
    </div>
  );
}


const NavSection = () => {
  return (
    <>
      <div
        className='fixed left-0 w-[50%] h-[50%] bg-slate-500 rounded-1/2 transform -translate-x-[40%] border-4 border-black'
       
      >
      </div>
      <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2'>
          Explore
        </p>
      </div>
      <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 -rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2'>
          Explore
        </p>
      </div>
    </>
  );
}

const Navbar = () => {
  const [hovered, setHovered] = React.useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  

  useEffect(() => {
    if (hovered) {
      gsap.to(navRef.current, {
        width: '38%',
        height: '74%',
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    } else {
      gsap.to(navRef.current, {
        width: '18%',
        height: '34%',
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  }, [hovered]);

const Player = () =>{
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const routes: StaticImageData[] = [exploreMnky, tiredmnky];
  let routeImg:StaticImageData = tiredmnky 
  if(cleanedPathname=='explore'){
     routeImg = routes[1]
  }else{
    routeImg = routes[0]
  }
  

  return(
    <>
    <div className='fixed left-0 bottom-[40%] w-[10%] h-[10%] bg-orange-500 transform -translate-x-3 translate-y-2  border-4 border-black origin-left flex items-center justify-center overflow-hidden'>
      <Image src={routeImg} alt='tiredmnky' style={{objectFit: "contain"}}></Image>
    </div>
    </>
  )
}

  return (
    <>
      {/* {hovered && <NavSection />} */}
      <div
        ref={navRef}
        className="fixed left-0 w-[18%] h-[34%] rounded-1/2 transform -translate-x-1/2 border-4 border-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)
        }
      >
        <Image 
        src={disc}
        alt='disc'
        className='fixed -translate-y-2'></Image>
        {/* {hovered && <div>
          <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2'>
          Explore
        </p>
      </div>
      <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 -rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2'>
          Explore
        </p>
      </div>
      
          </div>} */}
      </div>
      {hovered && <CurrentPage hovered={hovered} setHovered={setHovered}/>}
      {!hovered && <Player/>}
    </>
  );
};

export default Navbar;
