import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// Placeholder images for the slideshow
import image1 from '../assets/images/f1.jpg';
import image2 from '../assets/images/f2.jpg';
import image3 from '../assets/images/f3.jpg';
import image4 from '../assets/images/f4.jpg';
import image5 from '../assets/images/f5.jpg';

const images = [image1, image2, image3, image4, image5];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  // Dummy data for the dashboard
  const dashboardData = {
    currentCrop: 'Wheat',
    soilDetails: 'pH: 6.5, Nitrogen: 120 lbs/acre, Moisture: 30%',
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
    
      {/* Slideshow Section */}
      <section className="relative w-full max-h-96 overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={image} alt={`Farm Slide ${index + 1}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
        <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300" onClick={prevSlide}>
          <FaAngleLeft size={24} />
        </button>
        <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300" onClick={nextSlide}>
          <FaAngleRight size={24} />
        </button>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto mt-8 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Farmer's Friend 🌱</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your one-stop solution for modern agriculture. Use our tools to get insights, diagnose crop diseases, and predict the best crops for your farm.</p>
      </section>

      {/* Dashboard Section */}
      <section className="container mx-auto my-12 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Current Farm Dashboard 📊</h3>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-xl font-medium text-green-700 mb-2">Current Crop:</h4>
              <p className="text-3xl font-bold text-green-900">{dashboardData.currentCrop}</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-xl font-medium text-blue-700 mb-2">Soil Details:</h4>
              <p className="text-lg text-blue-900">{dashboardData.soilDetails}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="/predict-crop" className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
              Predict Your Crop
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;