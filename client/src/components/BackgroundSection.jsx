import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const BackgroundSection = () => {
    return (
        <div
            className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen"
            style={{ backgroundImage: `url(${assets.bgImage})` }}
        >
            {/* Nút Watch Trailer ở góc phải dưới */}
            <Link
                to="https://www.youtube.com/watch?v=BD6PoZJdt_M"
                aria-label="Watch Trailer"
                className="group absolute
                   bottom-[88px] right-[120px]
                   md:bottom-[96px] md:right-[170px]
                   lg:bottom-[115px] lg:right-[330px]
                   inline-flex items-center gap-2
                   rounded-full px-5 py-3
                   bg-white/15 text-white backdrop-blur
                   ring-1 ring-white/30 shadow-lg
                   hover:bg-white/25 hover:ring-white/50
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                   transition"
            >
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-white/50">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                        <path d="M8 5v14l11-7-11-7z" />
                    </svg>
                </span>
                <span className="font-semibold tracking-wide">Xem trailer</span>
            </Link>
        </div>
    )
}

export default BackgroundSection
