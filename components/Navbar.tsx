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
   
    <p className='fixed text-3xl font-semibold transform translate-x-7'>{cleanedPathname}</p> 
    </>
  )
}


const NavSection = () =>{
  return(
    <>
    <div className='fixed left-0  w-[50%] h-[50%] bg-slate-500 rounded-1/2  transform -translate-x-[40%] border-4 border-black'>


    </div>
    <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 rotate-[15deg] origin-left border-black'>
        <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2 '>
              Explore
        </p>
    </div>
    <div className='fixed left-0 w-[20%] h-[10%] bg-green-500 transform -translate-x-10 border-4 -rotate-[15deg] origin-left border-black'>
    <p className='fixed text-3xl font-semibold transform translate-x-[180%] translate-y-2 '>
              Explore
        </p>
    </div>
    
    </>
  )
}




const Navbar = () => {
  const [hovered, setHovered] = React.useState(false);


  return (
    <>
    {hovered && <NavSection />}
    <div className="fixed left-0  w-[18%] h-[34%] bg-slate-200 rounded-1/2  transform -translate-x-1/2 border-4 border-black" 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>
      
    </div>

    {!hovered && <CurrentPage />}
    
    </>
  );
};

export default Navbar;
