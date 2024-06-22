"use client"
import Link from 'next/link';
import './LaunchButton.css'

const LaunchButton = () => {
    return (
        <div className='drop-shadow'>
            <Link href='/launch'>
                 <button className="game-button">LAUNCH</button>
           </Link>
        </div>
    );
}

export default LaunchButton;