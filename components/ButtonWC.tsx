"use client"
import Image from 'next/image'
import './ui/GameButton.css'
import pepe from '@/public/pepe.png'


const ButtonWC = ({type, insideImg, width}) => {
    return (
        <div >
            <button
            className='game-button w-[130%] bg-black '> {type} <Image src={insideImg} alt="pepe" width={width}></Image></button>
            
        </div>
    );
}



export default ButtonWC;