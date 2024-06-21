"use client"
import { usePathname } from 'next/navigation';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';


const CurrentPage = ({ hovered, setHovered }) => {
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  const optionref = useRef(null);
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
    <div onMouseEnter={() => setHovered(true)} ref={optionref}>
      <Link href='/explore'>
        <div className='fixed left-0 w-[20%] h-[10%] bg-orange-500 transform -translate-x-3 translate-y-10 border-4 border-black origin-left flex items-center justify-center'>
          <p className='text-3xl font-semibold'>{cleanedPathname}</p>
        </div>
      </Link>
      <Link href='/my-profile'>
        <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 translate-y-10 border-4 rotate-[35deg] origin-left border-black flex items-center justify-center'>
          <p className='text-3xl font-semibold'>My-Profile</p>
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

  return (
    <>
      {/* {hovered && <NavSection />} */}
      <div
        ref={navRef}
        className="fixed left-0 w-[18%] h-[34%] bg-slate-200 rounded-1/2 transform -translate-x-1/2 border-4 border-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)
        }
      >
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
      {hovered && <CurrentPage setHovered={setHovered}/>}
    </>
  );
};

export default Navbar;
