import React, { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/marketPriceAPI';
import { FaSearch, FaRupeeSign, FaTrendingUp, FaTrendingDown, FaMapMarkerAlt } from 'react-icons/fa';

const MarketPricePage = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    commodity: ''
  });
  
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Indian states list for dropdown
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.state || !formData.commodity) {
      setError('Please select state and enter commodity name');
      return;
    }

    setLoading(true);
    setError('');
    setSearchPerformed(true);

    try {
      const result = await fetchMarketPrices({
        state: formData.state,
        district: formData.district || undefined,
        commodity: formData.commodity,
        limit: 50
      });

      if (result && result.records) {
        setMarketData(result.records);
      } else {
        setMarketData([]);
        setError('No market data found for the selected criteria');
      }
    } catch (err) {
      setError(`Error fetching market data: ${err.message}`);
      setMarketData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || price === 'NR' || price === 'NA') return 'N/A';
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Market Price Tracker
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Get real-time agricultural commodity prices across India
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-green-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-green-600" />
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* District Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    District (Optional)
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter district name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Commodity Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Crop/Commodity *
                  </label>
                  <input
                    type="text"
                    name="commodity"
                    value={formData.commodity}
                    onChange={handleInputChange}
                    placeholder="e.g., Tomato, Rice, Wheat"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FaSearch className="mr-2" />
                      Search Market Prices
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {searchPerformed && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">
                  Market Prices for {formData.commodity} in {formData.state}
                  {formData.district && `, ${formData.district}`}
                </h2>
                <p className="opacity-90 mt-2">
                  {marketData.length > 0 ? `Found ${marketData.length} results` : 'No results found'}
                </p>
              </div>

              {marketData.length > 0 ? (
                <div className="p-6">
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                          <th className="text-left p-4 font-semibold text-gray-700">Market</th>
                          <th className="text-left p-4 font-semibold text-gray-700">District</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Variety</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Min Price</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Max Price</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Modal Price</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{item.market || 'N/A'}</td>
                            <td className="p-4 text-gray-700">{item.district || 'N/A'}</td>
                            <td className="p-4 text-gray-700">{item.variety || 'N/A'}</td>
                            <td className="p-4 text-green-600 font-semibold">{formatPrice(item.min_price)}</td>
                            <td className="p-4 text-red-600 font-semibold">{formatPrice(item.max_price)}</td>
                            <td className="p-4 text-blue-600 font-bold text-lg">{formatPrice(item.modal_price)}</td>
                            <td className="p-4 text-gray-600">{formatDate(item.arrival_date)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {marketData.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-gray-900">{item.market || 'N/A'}</h3>
                          <span className="text-sm text-gray-500">{formatDate(item.arrival_date)}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-sm text-gray-600">District:</span>
                            <p className="font-medium">{item.district || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Variety:</span>
                            <p className="font-medium">{item.variety || 'N/A'}</p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="text-center p-3 bg-green-100 rounded-lg">
                            <p className="text-xs text-green-600 font-semibold">MIN PRICE</p>
                            <p className="text-lg font-bold text-green-700">{formatPrice(item.min_price)}</p>
                          </div>
                          <div className="text-center p-3 bg-blue-100 rounded-lg">
                            <p className="text-xs text-blue-600 font-semibold">MODAL PRICE</p>
                            <p className="text-lg font-bold text-blue-700">{formatPrice(item.modal_price)}</p>
                          </div>
                          <div className="text-center p-3 bg-red-100 rounded-lg">
                            <p className="text-xs text-red-600 font-semibold">MAX PRICE</p>
                            <p className="text-lg font-bold text-red-700">{formatPrice(item.max_price)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                searchPerformed && !loading && (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or check if the commodity name is correct.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPricePage;