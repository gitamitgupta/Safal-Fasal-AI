import React, { useState } from 'react';

// The following imports have been replaced with emojis and placeholder images to ensure the component is self-contained and compiles correctly.
// import { FaUpload, FaLeaf, FaMicroscope } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-4xl mt-14 w-full">
        
        {/* Intro Section - Two-column on desktop, stacked on mobile */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Crop Disease Diagnosis 🌿
            </h2>
            <p className="text-gray-600 mb-4">
              Upload a photo of your crop's leaf, and our AI model will analyze it to identify potential diseases.
            </p>
            <div className="space-y-2 text-gray-700 text-left mx-auto md:mx-0 max-w-sm">
                <p className="flex items-center">
                    <span className="text-xl mr-2">1.</span>
                    <span className="font-semibold">Take a clear photo of the affected leaf.</span>
                </p>
                <p className="flex items-center">
                    <span className="text-xl mr-2">2.</span>
                    <span className="font-semibold">Upload the image using the button below.</span>
                </p>
                <p className="flex items-center">
                    <span className="text-xl mr-2">3.</span>
                    <span className="font-semibold">Get instant results and confidence levels.</span>
                </p>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
             <img src="https://placehold.co/400x300/F0F3E8/335C33?text=Diagnosis" alt="An illustration of a person using an app to diagnose a crop disease." className="rounded-lg shadow-md w-full max-w-sm" />
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Upload and Results Section */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full flex justify-center mb-6">
            <label className="flex flex-col items-center px-6 py-4 bg-green-600 text-white rounded-full shadow-lg tracking-wide uppercase border-2 border-green-600 cursor-pointer hover:bg-green-700 transition-colors duration-300">
              <span className="text-2xl">⬆️</span>
              <span className="mt-2 text-base leading-normal font-semibold">
                {selectedFile ? 'Change Photo' : 'Upload Photo'}
              </span>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
          
          {previewUrl && (
            <div className="mb-6 border-2 border-gray-200 border-dashed rounded-xl p-2 w-full max-w-md">
              <img src={previewUrl} alt="Preview of uploaded crop leaf" className="w-full h-auto object-cover rounded-lg" />
            </div>
          )}

          <button
            type="submit"
            className={`w-full max-w-sm py-3 px-6 rounded-full font-bold text-white transition-colors duration-300 ${
              selectedFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } shadow-md`}
            disabled={!selectedFile || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Photo'}
          </button>
        </form>

        {loading && (
          <div className="mt-6 flex flex-col items-center text-center">
            <span className="text-green-500 animate-spin-slow text-4xl mb-4">🔬</span>
            <p className="text-gray-600 font-medium">Processing image with our ML model...</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Top 5 Possible Diseases
            </h3>
            <div className="space-y-4">
              {results.map((disease, index) => (
                <div key={index} className="flex justify-between items-center bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
                  <div className="flex items-center">
                    <span className="text-green-600 text-xl mr-4">🌿</span>
                    <span className="text-lg font-medium text-gray-700">{disease.name}</span>
                  </div>
                  <span className="font-bold text-green-800">{disease.confidence}</span>
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
