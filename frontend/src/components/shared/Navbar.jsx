import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import Notifications from '../Notifications'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                toast.success(res.data.message || "Logged out successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }

    const navLinks = user && user.role === 'recruiter' ? (
        <>
            <li><Link to="/admin/companies" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMenuOpen(false)}>Companies</Link></li>
            <li><Link to="/admin/jobs" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
        </>
    ) : (
        <>
            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/jobs" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
            <li><Link to="/browse" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMenuOpen(false)}>Browse</Link></li>
        </>
    );

    return (
        <div className='relative bg-gradient-to-r from-slate-900 via-purple-900/80 to-slate-900 backdrop-blur-xl border-b border-purple-500/30'>
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>

            {/* Glowing line at bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent pointer-events-none"></div>

            {/* Floating particles */}
            <div className="absolute top-2 left-20 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-ping pointer-events-none"></div>
            <div className="absolute top-4 right-32 w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-pulse delay-700 pointer-events-none"></div>

            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 md:h-20 px-4 relative z-50'>
                {/* Logo */}
                <div className="relative z-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 blur-lg opacity-20 rounded-lg pointer-events-none"></div>
                    <h1 className='relative text-2xl md:text-3xl font-black'>
                        <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-lg">Elite</span>
                        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">Hire</span>
                    </h1>
                </div>

                {/* Desktop Nav */}
                <div className='hidden md:flex items-center gap-8 lg:gap-12'>
                    <ul className='flex font-semibold items-center gap-6 lg:gap-8 relative z-50'>
                        {navLinks}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-3 relative z-50'>
                            <Link to="/login">
                                <Button variant="outline" className="border-purple-400/50 text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-400 backdrop-blur-sm transition-all duration-300 font-semibold px-5 py-2">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 text-white font-semibold px-5 py-2 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <span className="relative z-10">Signup</span>
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex items-center gap-4'>
                            {user && user.role === 'recruiter' && <Notifications />}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative group cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-110"></div>
                                        <Avatar className="cursor-pointer relative z-10 border-2 border-purple-400/30 hover:border-purple-400 transition-all duration-300 hover:scale-110">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 bg-slate-800/95 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-500/20">
                                    <div className=''>
                                        <div className='flex gap-3 space-y-2'>
                                            <Avatar className="cursor-pointer border-2 border-purple-400/30">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-300'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-4 text-gray-300'>
                                            {user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-3 cursor-pointer group hover:bg-white/10 rounded-lg p-2 transition-all duration-300'>
                                                    <User2 className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                                                    <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto font-medium">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center gap-3 cursor-pointer group hover:bg-red-500/10 rounded-lg p-2 transition-all duration-300'>
                                                <LogOut className="text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                                                <Button onClick={logoutHandler} variant="link" className="text-gray-300 hover:text-red-300 p-0 h-auto font-medium">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>

                {/* Mobile Right Side */}
                <div className="flex md:hidden items-center gap-3">
                    {user && user.role === 'recruiter' && <Notifications />}
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative group cursor-pointer">
                                    <Avatar className="cursor-pointer border-2 border-purple-400/30 w-8 h-8">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-slate-800/95 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-500/20 mr-4">
                                <div className='flex gap-3 mb-3'>
                                    <Avatar className="border-2 border-purple-400/30">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-white text-sm'>{user?.fullname}</h4>
                                        <p className='text-xs text-gray-300'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-300'>
                                    {user.role === 'student' && (
                                        <div className='flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-300'>
                                            <User2 className="text-purple-400 w-4 h-4" />
                                            <Link to="/profile" className="text-gray-300 hover:text-white text-sm font-medium">View Profile</Link>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-2 cursor-pointer hover:bg-red-500/10 rounded-lg p-2 transition-all duration-300' onClick={logoutHandler}>
                                        <LogOut className="text-red-400 w-4 h-4" />
                                        <span className="text-gray-300 hover:text-red-300 text-sm font-medium">Logout</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    {/* Hamburger Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-gray-300 hover:text-white transition-colors duration-300 p-1"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-slate-900/98 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl">
                    <ul className='flex flex-col font-semibold py-4 px-6 gap-1'>
                        {navLinks}
                        {!user && (
                            <>
                                <li className="pt-2">
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                                        <Button variant="outline" className="w-full border-purple-400/50 text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-400 transition-all duration-300 font-semibold">Login</Button>
                                    </Link>
                                </li>
                                <li className="pt-1">
                                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg transition-all duration-300">Signup</Button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar