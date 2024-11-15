import React, { useState } from "react";

const Navbar = ({ connectWallet, walletAddress }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white shadow-lg fixed top-0 w-full z-50 px-4 py-3">
            <div className="container mx-auto flex items-center justify-between py-3">
                {/* Logo and Slogan */}
                <div className="flex items-center space-x-4">
                    <img 
                        src="/Donatr.png" 
                        alt="Donatr Logo" 
                        className="h-8 w-8 object-contain" 
                    />
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold font-poppins tracking-wide">
                            Donatr
                        </h1>
                        <p className="text-xs italic font-inter">
                            Small Contributions, Big Impact
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden sm:flex items-center space-x-6">
                    <a href="/" className="text-base font-inter hover:underline">
                        Discover Pools
                    </a>
                    <a href="/create-pool" className="text-base font-inter hover:underline">
                        Start a Pool
                    </a>
                    <button
                        onClick={connectWallet}
                        className="bg-white text-blue-600 font-inter font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
                    >
                        {walletAddress
                            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                            : "Connect Wallet"}
                    </button>
                </div>

                {/* Hamburger Menu (for mobile) */}
                <div className="sm:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white px-6 py-4">
                    <a href="/" className="block text-base font-inter hover:underline mb-2">
                        Discover Pools
                    </a>
                    <a href="/create-pool" className="block text-base font-inter hover:underline mb-2">
                        Start a Pool
                    </a>
                    <button
                        onClick={connectWallet}
                        className="w-full bg-white text-blue-600 font-inter font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
                    >
                        {walletAddress
                            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                            : "Connect Wallet"}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
