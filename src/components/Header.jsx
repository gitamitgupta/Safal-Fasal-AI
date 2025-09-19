import React, { useState } from 'react';
import { FaSeedling, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
    // State to toggle the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // --- Start of Fixes ---

    // 1. Define classes for links to avoid repetition and errors.
    const baseLinkClasses = "transition-colors duration-300";
    const desktopLinkClasses = `${baseLinkClasses} hover:text-green-600`;
    const mobileLinkClasses = `${baseLinkClasses} block py-2 hover:bg-gray-100 rounded`;
    
    // 2. Define an inline style object for the active link.
    const activeLinkStyle = {
      color: '#16a34a', // A green color for the active link
      fontWeight: 'bold',
    };

    // Helper function to apply active style
    const getActiveStyle = ({ isActive }) => (isActive ? activeLinkStyle : undefined);

    // --- End of Fixes ---

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Website Name and Icon */}
                <div className="flex items-center space-x-2">
                    <FaSeedling className="text-green-600" size={28} />
                    <h1 className="text-2xl font-bold text-gray-800">Krishi Mitra</h1>
                </div>

                {/* Desktop Navigation Links - Replaced <a> with <NavLink> */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <li><NavLink to="/" className={desktopLinkClasses} style={getActiveStyle}>Home</NavLink></li>
                    <li><NavLink to="/profile" className={desktopLinkClasses} style={getActiveStyle}>Profile</NavLink></li>
                    <li><NavLink to="/faqs" className={desktopLinkClasses} style={getActiveStyle}>FAQs</NavLink></li>
                    <li><NavLink to="/crop-disease" className={desktopLinkClasses} style={getActiveStyle}>Crop Disease</NavLink></li>
                    <li><NavLink to="/predict-crop" className={desktopLinkClasses} style={getActiveStyle}>Predict Crop</NavLink></li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle mobile menu" className="text-gray-700 hover:text-green-600 focus:outline-none">
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu - Replaced <a> with <NavLink> and added onClick to close menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg py-4">
                    <ul className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
                        <li><NavLink to="/" className={mobileLinkClasses} style={getActiveStyle} onClick={toggleMenu}>Home</NavLink></li>
                        <li><NavLink to="/profile" className={mobileLinkClasses} style={getActiveStyle} onClick={toggleMenu}>Profile</NavLink></li>
                        <li><NavLink to="/faqs" className={mobileLinkClasses} style={getActiveStyle} onClick={toggleMenu}>FAQs</NavLink></li>
                        <li><NavLink to="/crop-disease" className={mobileLinkClasses} style={getActiveStyle} onClick={toggleMenu}>Crop Disease</NavLink></li>
                        <li><NavLink to="/predict-crop" className={mobileLinkClasses} style={getActiveStyle} onClick={toggleMenu}>Predict Crop</NavLink></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;