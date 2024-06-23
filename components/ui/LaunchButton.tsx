"use client"
import Link from 'next/link';
import './LaunchButton.css'
import { GlitchHandle, useGlitch } from 'react-powerglitch';

const LaunchButton = () => {
    const glitch: GlitchHandle = useGlitch({
        "playMode": "always",
    })
    return (
        <div className='drop-shadow' ref={glitch.ref}>
            <Link href='/launch'>
                 <button className="game-button">LAUNCH</button>
           </Link>
        </div>
    );
}

export default LaunchButton;