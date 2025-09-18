import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ... (import images and other components)
import image1 from '../assets/images/f1.jpg';
import image2 from '../assets/images/f2.jpg';
import image3 from '../assets/images/f3.jpg';
import image4 from '../assets/images/f4.jpg';
import image5 from '../assets/images/f5.jpg';
import FarmDashboard from '../components/FarmDashboard';
import ErrorBoundary from '../components/ErrorBoundary';

const images = [image1, image2, image3, image4, image5];


const HomePage = ({ dashboardData }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };
// ... (rest of your HomePage component)

  // Dummy data for the dashboard with all required properties
  const dummyDashboardData = {
    suitableCrop: 'Wheat',
    currentYield: 1500, // in lbs
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

  // Use the dummy data or the data passed from props if available
  const finalDashboardData = dashboardData || dummyDashboardData;


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
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome')}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('welcome_message')}</p>
      </section>

      {/* Dashboard Section */}
      <ErrorBoundary>
        <FarmDashboard dashboardData={finalDashboardData} />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;