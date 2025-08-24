import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[user, navigate]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <Navbar />
            
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            
            {/* Floating orbs - same as homepage */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
            
            {/* Shooting stars */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff] animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_#c084fc] animate-ping delay-700"></div>
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa] animate-ping delay-1000"></div>
            
            <div className='flex items-center justify-center max-w-7xl mx-auto min-h-screen pt-20 pb-10 px-4 relative z-10'>
                <div className="relative group">
                    {/* Form glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                    
                    <form onSubmit={submitHandler} className='relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20'>
                        {/* Header with gradient text - matching homepage */}
                        <div className="text-center mb-8">
                            <h1 className='text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-lg mb-2'>
                                Welcome Back
                            </h1>
                            <p className="text-gray-300 text-sm">Sign in to continue to EliteHire</p>
                        </div>
                        
                        <div className='space-y-6'>
                            <div className='group'>
                                <Label className="text-purple-300 font-semibold mb-2 block">Email</Label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="bg-white/10 border-purple-400/30 text-white placeholder-gray-400  placeholder:font-bold focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/20 transition-all duration-300 rounded-xl py-3 px-4"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className='group'>
                                <Label className="text-purple-300 font-semibold mb-2 block">Password</Label>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="bg-white/10 border-purple-400/30 text-white placeholder-gray-400  placeholder:font-bold focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/20 transition-all duration-300 rounded-xl py-3 px-4"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                            
                            <div className=''>
                                <Label className="text-purple-300 font-semibold mb-4 block">I am a</Label>
                                <RadioGroup className="flex items-center gap-6 justify-center">
                                    <div className="flex items-center space-x-3 group cursor-pointer">
                                        <div className="relative">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={input.role === 'student'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer w-5 h-5 text-purple-400 bg-white/10 border-purple-400/30 focus:ring-purple-400/20"
                                            />
                                        </div>
                                        <Label htmlFor="r1" className="text-gray-300 group-hover:text-purple-300 transition-colors duration-300 cursor-pointer font-medium">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-3 group cursor-pointer">
                                        <div className="relative">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === 'recruiter'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer w-5 h-5 text-purple-400 bg-white/10 border-purple-400/30 focus:ring-purple-400/20"
                                            />
                                        </div>
                                        <Label htmlFor="r2" className="text-gray-300 group-hover:text-purple-300 transition-colors duration-300 cursor-pointer font-medium">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            {
                                loading ? (
                                    <Button 
                                        disabled 
                                        className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden opacity-70"
                                    > 
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                        Please wait 
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                                    >
                                        {/* Button shimmer effect - same as homepage */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        <span className="relative z-10">Login</span>
                                    </Button>
                                )
                            }
                            
                            <div className="text-center pt-4 space-y-3">
                                <span className='text-gray-400 text-sm'>
                                    Don't have an account? {' '}
                                    <Link 
                                        to="/signup" 
                                        className='text-violet-400 hover:text-violet-300 font-semibold hover:underline transition-all duration-300'
                                    >
                                        Signup
                                    </Link>
                                </span>
                                
                                {/* Quick Navigation Links */}
                                <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-purple-400/20">
                                    <Link 
                                        to="/" 
                                        className="text-xs text-gray-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
                                    >
                                        Home
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <Link 
                                        to="/jobs" 
                                        className="text-xs text-gray-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
                                    >
                                        Jobs
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <Link 
                                        to="/browse" 
                                        className="text-xs text-gray-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
                                    >
                                        Browse
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login