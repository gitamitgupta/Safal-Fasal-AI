import React, { useState } from 'react';
import axios from 'axios';
import farmImage from '../assets/images/coffee farm-pana.png'; // Using an existing image

const YieldPredictionPage = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [formData, setFormData] = useState({
        crop: 'rice',
        state: 'Uttar Pradesh',
        fertilizer: 250,
        area: 1.5,
    });
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getCurrentLocation = () => {
        setError('');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (err) => {
                    setError('Unable to retrieve location. Please enable location services.');
                    console.error(err);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    const handleYieldPrediction = async (e) => {
        e.preventDefault();
        if (!userLocation) {
            setError('Please get your location first.');
            return;
        }
        setLoading(true);
        setError('');
        setPredictionResult(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`https://new-bckend-safalfasal.onrender.com/api/v1/data/crop-yield?lat=${userLocation.latitude}&lon=${userLocation.longitude}`, {
                crop: formData.crop,
                state: formData.state,
                fertilizer: Number(formData.fertilizer),
                area: Number(formData.area),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPredictionResult(response.data.data);
        } catch (err) {
            setError('Failed to get yield prediction. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-12 font-sans">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto mt-14">
                <section className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-4">
                        Crop Yield Prediction Tool 📈
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Provide details about your crop, state, area, and fertilizer usage to get an accurate yield prediction based on your location.
                    </p>
                </section>

                <hr className="my-8 border-gray-200" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Form Section */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Your Farm Details</h2>
                        <form onSubmit={handleYieldPrediction} className="space-y-4">
                            <div>
                                <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Crop Name</label>
                                <input type="text" name="crop" id="crop" value={formData.crop} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                            </div>
                             <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input type="text" name="state" id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                            </div>
                             <div>
                                <label htmlFor="fertilizer" className="block text-sm font-medium text-gray-700">Fertilizer (in kg)</label>
                                <input type="number" name="fertilizer" id="fertilizer" value={formData.fertilizer} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                            </div>
                             <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (in hectares)</label>
                                <input type="number" step="0.1" name="area" id="area" value={formData.area} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                            </div>
                            
                            <div className="flex flex-col space-y-3 pt-2">
                                <button type="button" onClick={getCurrentLocation} className={`w-full py-2 px-4 rounded-full font-semibold text-white transition-colors ${userLocation ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'}`}>
                                    {userLocation ? `Location Acquired: ${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}` : '1. Get Current Location'}
                                </button>
                                <button type="submit" disabled={loading || !userLocation} className="w-full py-2 px-4 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
                                    {loading ? 'Predicting...' : '2. Predict Yield'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Section */}
                    <div className="mt-6 md:mt-0">
                        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

                        {!predictionResult && (
                             <div className="text-center p-6 bg-green-50 rounded-lg">
                                <img src={farmImage} alt="Farmer illustration" className="w-48 h-48 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-700">Your results will appear here.</h3>
                                <p className="text-gray-500">Please fill out the form and click predict.</p>
                             </div>
                        )}

                        {predictionResult && (
                            <div className="bg-green-50 p-6 rounded-lg border">
                                <h2 className="text-xl font-bold text-green-800 mb-4 text-center">Prediction Result</h2>
                                <div className="text-center mb-6">
                                    <p className="text-gray-600">Predicted Yield</p>
                                    <p className="text-4xl font-extrabold text-green-600">
                                        {predictionResult.prediction.predicted_yield.toFixed(2)}
                                    </p>
                                    <p className="text-gray-500">{predictionResult.prediction.unit}</p>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Input Summary</h3>
                                <div className="text-sm bg-white p-4 rounded-md shadow-sm">
                                    {Object.entries(predictionResult.inputData).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-1 border-b last:border-none">
                                            <span className="capitalize text-gray-600">{key.replace('_', ' ')}:</span>
                                            <span className="font-semibold text-gray-800">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YieldPredictionPage;