import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSeedling, FaChartBar, FaMoneyBillWave } from 'react-icons/fa';

const PredictCropPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [predictedCrop, setPredictedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [yieldData, setYieldData] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);

  // Function to get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          // In a real application, you would make an API call here to get
          // weather and soil data based on latitude and longitude.
          // For this example, we'll use dummy data.
          fetchWeatherData(latitude, longitude);
          fetchSoilData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Dummy function to simulate fetching weather data
  const fetchWeatherData = (lat, lon) => {
    setWeatherData({
      temperature: 25, // in Celsius
      rainfall: 150,   // in mm
      humidity: 75,    // in %
    });
  };

  // Dummy function to simulate fetching soil data
  const fetchSoilData = (lat, lon) => {
    setSoilData({
      nitrogen: 120, // NPK values in kg/ha
      phosphorus: 50,
      potassium: 80,
    });
  };

  // Simulates the ML model's prediction
  const runPredictionModel = () => {
    setLoading(true);
    // This is where a real ML model API would be called with userLocation, weatherData, and soilData
    setTimeout(() => {
      // Dummy prediction logic
      if (weatherData && soilData) {
        if (weatherData.rainfall > 100 && soilData.nitrogen > 100) {
          setPredictedCrop("Rice 🌾");
        } else if (weatherData.temperature > 20 && soilData.phosphorus > 40) {
          setPredictedCrop("Wheat 🌾");
        } else {
          setPredictedCrop("Maize 🌽");
        }
      }
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for the ML model
  };

  const showYield = () => {
    setYieldData("50-60 quintals/hectare (estimated)");
    setMarketPrice(null); // Clear market price if yield is requested
  };

  const showMarketPrice = () => {
    setMarketPrice("₹2,125 per quintal (as of today's market)");
    setYieldData(null); // Clear yield if market price is requested
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Crop Prediction Tool 🌱
        </h2>
        <p className="text-gray-600 mb-8">
          Predict the most suitable crop for your location based on real-time
          weather and soil data.
        </p>

        {/* Location Section */}
        <div className="mb-6">
          <button
            onClick={getCurrentLocation}
            className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
          >
            <FaMapMarkerAlt className="mr-2" />
            Get My Current Location
          </button>
        </div>

        {/* Display fetched data */}
        {userLocation && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Your Current Data
            </h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="font-medium text-gray-700">Location:</p>
                <p className="text-sm text-gray-500">
                  Lat: {userLocation.latitude.toFixed(4)}, Lon: {userLocation.longitude.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Temperature:</p>
                <p className="text-sm text-gray-500">{weatherData?.temperature}°C</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Rainfall:</p>
                <p className="text-sm text-gray-500">{weatherData?.rainfall} mm</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Humidity:</p>
                <p className="text-sm text-gray-500">{weatherData?.humidity}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Soil Nutrients (NPK):</p>
                <p className="text-sm text-gray-500">
                  N: {soilData?.nitrogen}, P: {soilData?.phosphorus}, K: {soilData?.potassium}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Button */}
        <button
          onClick={runPredictionModel}
          disabled={!userLocation || loading}
          className={`w-full px-6 py-3 font-bold text-white rounded-full shadow-lg transition-colors duration-300 ${
            userLocation ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing Data...' : 'Predict Crop'}
        </button>

        {/* Prediction Result */}
        {predictedCrop && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-green-700">
              The best crop for your location is:
            </h3>
            <p className="text-5xl mt-4 font-extrabold text-green-500 animate-pulse">
              {predictedCrop}
            </p>
            
            {/* Buttons for additional info */}
            <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={showYield}
                className="flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300"
              >
                <FaChartBar className="mr-2" />
                Show Estimated Yield
              </button>
              <button
                onClick={showMarketPrice}
                className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300"
              >
                <FaMoneyBillWave className="mr-2" />
                Check Market Price
              </button>
            </div>

            {/* Display Yield or Price */}
            {(yieldData || marketPrice) && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                {yieldData && <p className="text-yellow-800 text-lg font-medium">{yieldData}</p>}
                {marketPrice && <p className="text-yellow-800 text-lg font-medium">{marketPrice}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictCropPage;