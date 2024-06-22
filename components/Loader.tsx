"use client"
import pedro from "@/public/racoon-pedro.gif"
import Image from "next/image"
import { useGlitch, GlitchHandle } from "react-powerglitch";




export default function LoadingSkeleton(){
    const glitch: GlitchHandle = useGlitch({
        "playMode": "always",
 } );
    return (
        <>
        <div className="left-[50%] bottom-[50%]">
        <Image
          width={200}
          src={pedro}
          alt="logo"
          ref={glitch.ref}></Image>
          
          </div>
        </>
          
    )
}