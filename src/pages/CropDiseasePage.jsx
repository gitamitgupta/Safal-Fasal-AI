import React, { useState } from 'react';
import { FaUpload, FaLeaf, FaMicroscope } from 'react-icons/fa';

const CropDiseasePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Placeholder function for the ML model API call
  const analyzeImage = async (imageFile) => {
    // Simulate an API call and ML model processing delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Dummy data for the top 5 possible diseases
    const dummyResults = [
      { name: 'Late Blight', confidence: '92%' },
      { name: 'Early Blight', confidence: '85%' },
      { name: 'Leaf Mold', confidence: '78%' },
      { name: 'Septoria Leaf Spot', confidence: '65%' },
      { name: 'Spider Mites', confidence: '55%' },
    ];
    
    setLoading(false);
    setResults(dummyResults);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults([]); // Clear previous results
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      analyzeImage(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Crop Disease Diagnosis 🌿
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Upload a photo of your crop's leaf, and our AI model will analyze it
          to identify potential diseases.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full flex justify-center mb-6">
            <label className="flex flex-col items-center px-4 py-6 bg-green-500 text-white rounded-full shadow-lg tracking-wide uppercase border border-green-500 cursor-pointer hover:bg-green-600 transition-colors duration-300">
              <FaUpload size={24} />
              <span className="mt-2 text-base leading-normal">
                {selectedFile ? 'Change Photo' : 'Upload Photo'}
              </span>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
          
          {previewUrl && (
            <div className="mb-6 border-2 border-gray-300 border-dashed rounded-lg p-2 w-full max-w-sm">
              <img src={previewUrl} alt="Preview of uploaded crop leaf" className="w-full h-auto object-cover rounded-md" />
            </div>
          )}

          <button
            type="submit"
            className={`w-full max-w-sm py-3 px-6 rounded-full font-bold text-white transition-colors duration-300 ${
              selectedFile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedFile || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Photo'}
          </button>
        </form>

        {loading && (
          <div className="mt-6 flex justify-center items-center">
            <FaMicroscope className="animate-pulse text-green-500" size={32} />
            <p className="ml-4 text-gray-600">Processing image with our ML model...</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Top 5 Possible Diseases
            </h3>
            <div className="space-y-4">
              {results.map((disease, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <FaLeaf className="text-green-500 mr-4" size={20} />
                    <span className="text-lg font-medium text-gray-700">{disease.name}</span>
                  </div>
                  <span className="font-bold text-green-600">{disease.confidence}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDiseasePage;