import React, { useState } from 'react';
import { FaSeedling, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    // State to toggle the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Website Name and Icon */}
                <div className="flex items-center space-x-2">
                    <FaSeedling className="text-green-600" size={28} />
                    <h1 className="text-2xl font-bold text-gray-800">Krishi Mitra</h1>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <li><a href="/" className="hover:text-green-600 transition-colors duration-300">Home</a></li>
                    <li><a href="/profile" className="hover:text-green-600 transition-colors duration-300">Profile</a></li>
                    <li><a href="/faqs" className="hover:text-green-600 transition-colors duration-300">FAQs</a></li>
                    <li><a href="/crop-disease" className="hover:text-green-600 transition-colors duration-300">Crop Disease</a></li>
                    <li><a href="/predict-crop" className="hover:text-green-600 transition-colors duration-300">Predict Crop</a></li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle mobile menu" className="text-gray-700 hover:text-green-600 focus:outline-none">
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg py-4">
                    <ul className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
                        <li><a href="/" className="block py-2 hover:bg-gray-100 rounded transition-colors duration-300">Home</a></li>
                        <li><a href="/profile" className="block py-2 hover:bg-gray-100 rounded transition-colors duration-300">Profile</a></li>
                        <li><a href="/faqs" className="block py-2 hover:bg-gray-100 rounded transition-colors duration-300">FAQs</a></li>
                        <li><a href="/crop-disease" className="block py-2 hover:bg-gray-100 rounded transition-colors duration-300">Crop Disease</a></li>
                        <li><a href="/predict-crop" className="block py-2 hover:bg-gray-100 rounded transition-colors duration-300">Predict Crop</a></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;