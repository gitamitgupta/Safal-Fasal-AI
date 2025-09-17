import React from 'react';
import { FaSeedling } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Website Name and Icon */}
        <div className="flex items-center space-x-2">
          <FaSeedling className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Krishi Mitra</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="/" className="hover:text-green-600 transition duration-300">Home</a></li>
          <li><a href="/profile" className="hover:text-green-600 transition duration-300">Profile</a></li>
          <li><a href="/faqs" className="hover:text-green-600 transition duration-300">FAQs</a></li>
          <li><a href="/crop-disease" className="hover:text-green-600 transition duration-300">Crop Disease</a></li>
          <li><a href="/predict-crop" className="hover:text-green-600 transition duration-300">Predict Crop</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;