import React from "react";

const Navbar = () => {
    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">Micro-Donation Platform</h1>
                <div className="flex space-x-4">
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/create-pool" className="hover:underline">
                        Create Pool
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
