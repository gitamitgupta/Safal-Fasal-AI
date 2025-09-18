import React from 'react';

const FarmDashboard = ({ dashboardData }) => {
  // Conditional rendering to display a message if dashboardData is not available
  if (!dashboardData) {
    return (
      <section className="container mx-auto my-12 px-6 text-center text-gray-500">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Farm Dashboard</h3>
          <p>Please go to the "Predict Your Crop" page to get personalized farm insights.</p>
        </div>
      </section>
    );
  }

  // Render the full dashboard when dashboardData is available
  return (
    <section className="container mx-auto my-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Current Farm Dashboard 📊</h3>
        <div className="grid md:grid-cols-2 gap-8 text-center">
          {/* CROP SECTION */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-xl font-medium text-green-700 mb-2">Suitable Crop & Yield:</h4>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-900 mb-4">{dashboardData.suitableCrop}</p>
            </div>

            <h5 className="text-lg font-medium text-green-600 mb-2">Yield Comparison:</h5>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 relative">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${dashboardData.currentYieldPercentage}%` }}
              ></div>
              <div
                className="absolute top-0 h-full bg-red-500"
                style={{ left: `${dashboardData.prevYearYieldPercentage}%`, width: '2px' }}
              ></div>
              <span className="absolute -bottom-6 text-xs text-gray-500 left-0">0%</span>
              <span className="absolute -bottom-6 text-xs text-gray-500 right-0">100%</span>
              <span
                className="absolute -top-6 text-sm text-green-900 font-bold"
                style={{ left: `${dashboardData.currentYieldPercentage}%`, transform: 'translateX(-50%)' }}
              >
                {dashboardData.currentYield} lbs
              </span>
              <span
                className="absolute -bottom-6 text-xs text-red-500"
                style={{ left: `${dashboardData.prevYearYieldPercentage}%`, transform: 'translateX(-50%)' }}
              >
                Prev Year
              </span>
            </div>

            <h5 className="text-lg font-medium text-green-600 mt-6 mb-2">Market Price Comparison:</h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">Local Price</p>
                <p className="text-xl font-bold text-gray-800">{dashboardData.localPrice}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Standard Price</p>
                <p className="text-xl font-bold text-gray-800">{dashboardData.standardPrice}</p>
              </div>
            </div>
          </div>

          {/* SOIL SECTION */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-xl font-medium text-blue-700 mb-2">Soil Details:</h4>
            <h5 className="text-lg font-medium text-blue-600 mb-2">Composition:</h5>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 flex overflow-hidden">
              <div
                className="bg-yellow-600 h-4"
                style={{ width: `${dashboardData.soilComposition.sand}%` }}
              ></div>
              <div
                className="bg-brown-600 h-4"
                style={{ width: `${dashboardData.soilComposition.silt}%` }}
              ></div>
              <div
                className="bg-red-600 h-4"
                style={{ width: `${dashboardData.soilComposition.clay}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mb-6">
              <span>Sand: {dashboardData.soilComposition.sand}%</span>
              <span>Silt: {dashboardData.soilComposition.silt}%</span>
              <span>Clay: {dashboardData.soilComposition.clay}%</span>
            </div>

            <h5 className="text-lg font-medium text-blue-600 mb-2">Key Parameters:</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">pH</p>
                <p className="text-xl font-bold text-blue-900">{dashboardData.soilParameters.ph}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">Nitrogen (N)</p>
                <p className="text-xl font-bold text-blue-900">{dashboardData.soilParameters.nitrogen}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">Phosphorus (P)</p>
                <p className="text-xl font-bold text-blue-900">{dashboardData.soilParameters.phosphorus}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/predict-crop"
            className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          >
            Predict Your Crop
          </a>
        </div>
      </div>
    </section>
  );
};

export default FarmDashboard;