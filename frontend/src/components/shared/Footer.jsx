import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-slate-900 via-purple-900/50 to-slate-900 border-t border-purple-500/30 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-0 left-20 w-40 h-40 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-20 w-48 h-48 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full opacity-10 blur-3xl animate-pulse delay-700"></div>
      
      {/* Glowing line at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 blur-lg opacity-20 rounded-lg"></div>
              <h2 className="relative text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                EliteHire
              </h2>
            </div>
            <p className="text-gray-300 text-base mt-2 font-medium tracking-wide">
              <span className="text-purple-300">©</span>Hire Smart.<span className="text-purple-300">Hire Elite.</span>
            </p>
          </div>
          
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a 
              href="https://facebook.com" 
              className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110 hover:bg-white/10" 
              aria-label="Facebook"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white relative z-10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>
            
            <a 
              href="https://twitter.com" 
              className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110 hover:bg-white/10" 
              aria-label="Twitter"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white relative z-10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            
            <a 
              href="https://linkedin.com" 
              className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110 hover:bg-white/10" 
              aria-label="LinkedIn"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white relative z-10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-8 right-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-pulse delay-500"></div>
      </div>
    </footer>
  );
}

export default Footer;