"use client"
import { usePathname } from 'next/navigation';
import React from 'react';


const CurrentPage = () =>{
  const pathname = usePathname()
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return(
    <>
    <div className='fixed left-0 w-[20%] h-[10%] bg-orange-500 transform -translate-x-10 border-4 border-black'>
       
    </div>
    <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[160%] translate-y-2 '>
              Explore
        </p>
    </div>
    <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 -rotate-[15deg] origin-left border-black'>
    <p className='fixed text-3xl font-semibold transform translate-x-[160%] translate-y-2 '>
              Explore
        </p>
    </div>
    <p className='fixed text-3xl font-semibold transform translate-x-7'>{cleanedPathname}</p> 
    </>
  )
}


const NavSection = () =>{
  return(
    <>
    <div className='fixed left-0  w-1/4 h-[60%] bg-slate-500 rounded-1/2  transform -translate-x-[40%] border-4 border-black'>


    </div>
    
    </>
  )
}




const Navbar = () => {
  return (
    <>
    <NavSection />
    <div className="fixed left-0  w-[18%] h-[34%] bg-slate-200 rounded-1/2  transform -translate-x-1/2 border-4 border-black" >
      
    </div>
    <CurrentPage />
    
    </>
  );
};

export default Navbar;
