// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaSeedling, FaChartLine, FaTint, FaMoneyBillWave } from 'react-icons/fa';

import image1 from '../assets/images/f1.jpg';
import image2 from '../assets/images/f2.jpg';
import image3 from '../assets/images/f3.jpg';
import image4 from '../assets/images/f4.jpg';
import image5 from '../assets/images/f5.jpg';
import FarmDashboard from '../components/FarmDashboard';
import ErrorBoundary from '../components/ErrorBoundary';

const images = [image1, image2, image3, image4, image5];

const HomePage = ({ dashboardData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const dummyDashboardData = {
    suitableCrop: 'Wheat',
    currentYield: 1500,
    currentYieldPercentage: 75,
    prevYearYieldPercentage: 60,
    localPrice: '₹ 2,275 / quintal',
    standardPrice: '₹ 2,125 / quintal',
    soilComposition: {
      sand: 40,
      silt: 40,
      clay: 20
    },
    soilParameters: {
      ph: 6.5,
      nitrogen: '120 lbs/acre',
      phosphorus: '80 lbs/acre'
    }
  };

  const finalDashboardData = dashboardData || dummyDashboardData;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* Dynamic Hero Section - Mobile-first adjustments */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img src={image} alt={`Farm Slide ${index + 1}`} className="w-full h-full object-cover brightness-75" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg mt-6">Welcome Kishore Ji!</h1>
          <p className="text-sm sm:text-base md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Your one-stop solution for modern agriculture. Get insights, diagnose crop diseases, and predict the best crops for your farm.
          </p>
          <button className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base">
            View Your Farm Dashboard
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </section>

      {/* Main Content Area - Dashboard - Mobile-first grid */}
      <main className="container mx-auto my-8 px-4 sm:px-6">
        <ErrorBoundary>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 text-center">Your Farm Insights</h2>
          {/* Default to a single column, transition to two columns on medium screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cards remain the same, their responsiveness is handled by the parent grid */}
            {/* Suitable Crop Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105">
              <FaSeedling className="text-green-500 text-3xl sm:text-4xl mb-3" />
              <h3 className="text-lg sm:text-xl font-bold mb-1">Suitable Crop</h3>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-700">{finalDashboardData.suitableCrop}</p>
            </div>

            {/* Current Yield Card with Gauge */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-3">
                <FaChartLine className="text-indigo-500 text-3xl sm:text-4xl mr-3" />
                <h3 className="text-lg sm:text-xl font-bold">Current Yield</h3>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl font-extrabold text-indigo-700 mb-1">{finalDashboardData.currentYield} lbs</p>
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-gray-600">
                  <span className="relative">
                    {finalDashboardData.currentYieldPercentage}%
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-2 text-gray-500">vs {finalDashboardData.prevYearYieldPercentage}% last year</p>
              </div>
            </div>

            {/* Price Insights Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-3">
                <FaMoneyBillWave className="text-yellow-500 text-3xl sm:text-4xl mr-3" />
                <h3 className="text-lg sm:text-xl font-bold">Price Insights</h3>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <span className="font-semibold text-gray-600 text-sm">Local Price:</span>
                <span className="text-base sm:text-lg font-bold text-yellow-700">{finalDashboardData.localPrice}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-gray-600 text-sm">Standard Price:</span>
                <span className="text-base sm:text-lg font-bold text-gray-500">{finalDashboardData.standardPrice}</span>
              </div>
            </div>

            {/* Soil Composition Card with Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-1 lg:col-span-2 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-3">
                <FaTint className="text-blue-500 text-3xl sm:text-4xl mr-3" />
                <h3 className="text-lg sm:text-xl font-bold">Soil Composition</h3>
              </div>
              <div className="w-full h-32 sm:h-40 bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-gray-500 text-sm">Chart Component Goes Here</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs sm:text-sm text-center">
                <div className="p-2 bg-blue-100 rounded-md">
                  <p className="font-bold">{finalDashboardData.soilComposition.sand}%</p>
                  <p className="text-gray-600">Sand</p>
                </div>
                <div className="p-2 bg-green-100 rounded-md">
                  <p className="font-bold">{finalDashboardData.soilComposition.silt}%</p>
                  <p className="text-gray-600">Silt</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-md">
                  <p className="font-bold">{finalDashboardData.soilComposition.clay}%</p>
                  <p className="text-gray-600">Clay</p>
                </div>
              </div>
            </div>

            {/* Soil Parameters Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-1 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-3">
                <FaTint className="text-green-500 text-3xl sm:text-4xl mr-3" />
                <h3 className="text-lg sm:text-xl font-bold">Soil Parameters</h3>
              </div>
              <ul className="space-y-1">
                <li className="flex justify-between items-center py-1 border-b border-gray-200">
                  <span className="font-semibold text-gray-600 text-sm">pH:</span>
                  <span className="text-base sm:text-lg font-bold">{finalDashboardData.soilParameters.ph}</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200">
                  <span className="font-semibold text-gray-600 text-sm">Nitrogen:</span>
                  <span className="text-base sm:text-lg font-bold">{finalDashboardData.soilParameters.nitrogen}</span>
                </li>
                <li className="flex justify-between items-center py-1">
                  <span className="font-semibold text-gray-600 text-sm">Phosphorus:</span>
                  <span className="text-base sm:text-lg font-bold">{finalDashboardData.soilParameters.phosphorus}</span>
                </li>
              </ul>
            </div>
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default HomePage;