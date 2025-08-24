import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            
            {/* Floating orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
            
            {/* Shooting stars */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff] animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_#c084fc] animate-ping delay-700"></div>
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa] animate-ping delay-1000"></div>

            <div className='flex flex-col gap-10 my-16 relative z-10 px-4'>
                {/* Badge with neon effect */}
                <div className="relative mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-75 animate-pulse"></div>
                    <span className='relative mx-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-bold text-sm tracking-wide shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500 cursor-default'>
                        ✨ No. 1 Job Hunt Website ✨
                    </span>
                </div>

                {/* Main heading with advanced effects */}
                <div className="relative">
                    <h1 className='text-7xl lg:text-8xl font-black leading-tight'>
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                            Search, Apply &
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                            Get Your
                        </span>{' '}
                        <span className='relative inline-block'>
                            <span className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent blur-sm"></span>
                            <span className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
                                Dream Jobs
                            </span>
                        </span>
                    </h1>
                </div>

                {/* Enhanced description */}
                <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light'>
                    Unlock your potential with cutting-edge job matching technology. 
                    <br />
                    <span className="text-purple-300">Your dream career is just one search away.</span>
                </p>

                {/* Futuristic search bar */}
                <div className='relative w-[50%] mx-auto group'>
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                    
                    <div className='relative flex shadow-2xl border border-purple-400/30 backdrop-blur-xl bg-white/10 rounded-full items-center overflow-hidden hover:bg-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/25'>
                        <input
                            type="text"
                            placeholder='🚀 Find your dream jobs...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-6 px-8 bg-transparent text-white placeholder-gray-300 text-lg font-medium'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-r-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 px-8 py-6 shadow-2xl border-0 transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
                        >
                            {/* Button shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <Search className='h-7 w-7 relative z-10' />
                        </Button>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-32 right-20 opacity-20">
                    <div className="w-16 h-16 border border-purple-400 rounded-lg rotate-45 animate-spin-slow"></div>
                </div>
                <div className="absolute bottom-32 left-20 opacity-20">
                    <div className="w-12 h-12 border border-blue-400 rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection