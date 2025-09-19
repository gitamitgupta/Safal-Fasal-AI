import React, { useState, useEffect } from 'react';
import f2 from '../assets/images/Farmer-cuate.png'

const PredictCropPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [predictedCrops, setPredictedCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [yieldData, setYieldData] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Dummy function to simulate fetching weather and soil data
  const fetchEnvironmentalData = (lat, lon) => {
    setWeatherData({
      temperature: 25, // in Celsius
      rainfall: 150, // in mm
      humidity: 75, // in %
    });
    setSoilData({
      nitrogen: 120, // NPK values in kg/ha
      phosphorus: 50,
      potassium: 80,
    });
  };

  const getCurrentLocation = () => {
    setErrorMessage(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchEnvironmentalData(latitude, longitude);
          setShowInstructions(false);
        },
        (error) => {
          // Log a more descriptive error message to the console
          console.error("Error getting location: Please enable location services.", error);
          setErrorMessage("Could not get your location. Please enable location services and try again.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
    }
  };

  const runPredictionModel = () => {
    setLoading(true);
    setPredictedCrops([]);
    setSelectedCrop(null);
    setYieldData(null);
    setMarketPrice(null);

    // This is where a real ML model API would be called.
    setTimeout(() => {
      // Dummy prediction logic returning multiple crops
      const predictions = [
        { name: "Rice 🌾", confidence: "92%", yield: "50-60 quintals/hectare", yieldPercentage: 85, price: "₹2,125 per quintal" },
        { name: "Maize 🌽", confidence: "85%", yield: "40-50 quintals/hectare", yieldPercentage: 70, price: "₹1,850 per quintal" },
        { name: "Wheat 🌾", confidence: "78%", yield: "30-40 quintals/hectare", yieldPercentage: 60, price: "₹2,200 per quintal" },
      ];
      setPredictedCrops(predictions);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  const selectCrop = (crop) => {
    setSelectedCrop(crop);
    setYieldData(null);
    setMarketPrice(null);
  };

  const showYield = () => {
    if (selectedCrop) {
      setYieldData(selectedCrop.yield);
      setMarketPrice(null);
    }
  };

  const showMarketPrice = () => {
    if (selectedCrop) {
      setMarketPrice(selectedCrop.price);
      setYieldData(null);
    }
  };

  const ProgressCircle = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="relative w-28 h-28 flex mt-14 items-center justify-center">
        <svg className="w-full h-full mt-14" viewBox="0 0 120 120">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-green-500"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute text-xl font-bold text-gray-700">
          {`${percentage}%`}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-6 md:p-12">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-6xl mx-auto">
        
        {/* Header and Intro Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4">
              Crop Prediction Tool 🌱
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
              Predict the most suitable crop for your farm based on real-time environmental data. Our tool analyzes your location's weather and soil composition to provide accurate, data-driven recommendations.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <img 
              src={f2}
              alt="Illustration of a farmer using a crop prediction tool." 
              className="rounded-lg shadow-md w-full max-w-sm" 
            />
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Instructions Section */}
        {showInstructions && (
          <section className="bg-green-50 rounded-lg p-6 sm:p-8 mb-8 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <span className="font-semibold">Get your location data:</span> Click the "Get My Current Location" button below to fetch your latitude and longitude, along with your area's weather and soil data.
              </li>
              <li>
                <span className="font-semibold">Run the prediction model:</span> Once your location data is displayed, the "Predict Crop" button will become active. Click it to get a list of the most suitable crops for your area.
              </li>
              <li>
                <span className="font-semibold">View detailed insights:</span> After the prediction, select a crop to see its estimated yield and today's market price.
              </li>
            </ol>
          </section>
        )}

        {/* Main Tool Interface */}
        <section>
          {/* Location Button */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={getCurrentLocation}
              className="flex items-center justify-center max-w-sm w-full px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
            >
              <span className="text-xl mr-2">📍</span>
              Get My Current Location
            </button>
          </div>
          
          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {/* Display fetched data with enhanced UI */}
          {userLocation && (
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-inner mb-8 transition-opacity duration-500 ease-in-out">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Your Current Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Location Card */}
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <span className="mr-3 text-blue-500 text-2xl">🗺️</span>
                  <div>
                    <p className="font-bold text-gray-700">Location:</p>
                    <p className="text-sm text-gray-500">
                      Lat: {userLocation.latitude.toFixed(4)}, Lon: {userLocation.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                {/* Temperature Card */}
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <span className="mr-3 text-red-500 text-2xl">🌡️</span>
                  <div>
                    <p className="font-bold text-gray-700">Temperature:</p>
                    <p className="text-sm text-gray-500">{weatherData?.temperature}°C</p>
                  </div>
                </div>
                {/* Rainfall Card */}
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <span className="mr-3 text-blue-500 text-2xl">🌧️</span>
                  <div>
                    <p className="font-bold text-gray-700">Rainfall:</p>
                    <p className="text-sm text-gray-500">{weatherData?.rainfall} mm</p>
                  </div>
                </div>
                {/* Humidity Card */}
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <span className="mr-3 text-yellow-500 text-2xl">💧</span>
                  <div>
                    <p className="font-bold text-gray-700">Humidity:</p>
                    <p className="text-sm text-gray-500">{weatherData?.humidity}%</p>
                  </div>
                </div>
                {/* Soil Nutrients Card */}
                <div className="bg-white rounded-lg p-4 shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-bold text-gray-700 flex items-center mb-2">
                    <span className="mr-3 text-green-500 text-2xl">🧪</span>Soil Nutrients (NPK)
                  </p>
                  <div className="flex flex-wrap justify-between gap-4 text-center mt-2">
                    <div className="flex-1 min-w-[80px] bg-sky-50 rounded-lg p-3 shadow-inner">
                      <p className="font-bold text-lg text-gray-800">{soilData?.nitrogen}</p>
                      <p className="text-xs text-gray-500">Nitrogen</p>
                    </div>
                    <div className="flex-1 min-w-[80px] bg-red-50 rounded-lg p-3 shadow-inner">
                      <p className="font-bold text-lg text-gray-800">{soilData?.phosphorus}</p>
                      <p className="text-xs text-gray-500">Phosphorus</p>
                    </div>
                    <div className="flex-1 min-w-[80px] bg-yellow-50 rounded-lg p-3 shadow-inner">
                      <p className="font-bold text-lg text-gray-800">{soilData?.potassium}</p>
                      <p className="text-xs text-gray-500">Potassium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prediction Button */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={runPredictionModel}
              disabled={!userLocation || loading}
              className={`w-full max-w-sm px-6 py-3 font-bold text-white rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105 ${
                userLocation && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Analyzing Data...' : 'Predict Crop'}
            </button>
          </div>
          
          {loading && (
            <div className="mt-8 flex justify-center items-center">
              <span className="text-4xl text-blue-500 animate-pulse">⚙️</span>
              <p className="ml-4 text-gray-600 font-medium">Processing your data...</p>
            </div>
          )}

          {/* Predicted Crops Section */}
          {predictedCrops.length > 0 && (
            <div className="mt-8 text-center" id="results">
              <h3 className="text-2xl font-bold text-green-700 mb-6">
                Most Suitable Crops
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {predictedCrops.map((crop, index) => (
                  <div 
                    key={index} 
                    onClick={() => selectCrop(crop)}
                    className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 border-4 ${selectedCrop?.name === crop.name ? 'border-green-500' : 'border-transparent'}`}
                  >
                    <span className="text-5xl mb-4">{crop.name.slice(-2)}</span>
                    <h4 className="text-xl font-bold text-gray-800">{crop.name.split(' ')[0]}</h4>
                    <p className="text-sm text-gray-500 mt-2">Confidence: <span className="font-semibold text-green-600">{crop.confidence}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Insight Section */}
          {selectedCrop && (
            <div className="mt-8 text-center bg-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Insights for {selectedCrop.name.split(' ')[0]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Yield Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
                  <span className="text-green-500 text-5xl mb-4">📈</span>
                  <h4 className="text-xl font-bold mb-2">Estimated Yield</h4>
                  <ProgressCircle percentage={selectedCrop.yieldPercentage} />
                  <p className="text-lg font-semibold text-gray-700 mt-4">{selectedCrop.yield}</p>
                </div>
                {/* Market Price Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
                  <span className="text-yellow-500 text-5xl mb-4">💰</span>
                  <h4 className="text-xl font-bold mb-2">Market Price</h4>
                  <p className="text-2xl font-bold text-yellow-600">{selectedCrop.price}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Price reflects today's market rates)
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PredictCropPage;
