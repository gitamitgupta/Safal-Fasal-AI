import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaPaperPlane, FaSeedling, FaTractor } from 'react-icons/fa';

const faqsData = [
  {
    question: "What is the best time to plant wheat in North India?",
    answer: "The ideal time for planting wheat in North India is from mid-October to mid-November. This ensures the crop matures before the peak summer heat.",
    keywords: ["wheat", "planting time", "north india"]
  },
  {
    question: "I am new to farming. Can this website help me choose the right crops?",
    answer: "Our website is a great tool for both new and experienced farmers. By providing your location and land details, our system analyses regional data to recommend crops that suit your soil and climate.",
    keywords: ["new", "farming", "right"]
  },
  {
    question: "What are the common diseases of potatoes?",
    answer: "Common potato diseases include Late Blight, Early Blight, and Scab. Proper crop rotation, using disease-resistant varieties, and good field sanitation can help prevent them.",
    keywords: ["potatoes", "diseases", "blight"]
  },
  {
    question: "How do I use the 'Crop Predict' feature?",
    answer: "Simply navigate to the 'Predict Crop' page and input details about your soil (like NPK levels), temperature, and rainfall. Our model will then suggest the most suitable crop for your conditions.",
    keywords: ["predict crop", "how to use", "feature"]
  },
  {
    question: "How can I get an estimated crop yield?",
    answer: "After the 'Crop Predict' feature suggests a crop, a button will appear to 'Show Estimated Yield'. Clicking this will provide an estimate based on your location and input data.",
    keywords: ["yield", "estimate", "predict"]
  },
  {
    question: "Which fertilizers are best for rice cultivation?",
    answer: "For rice, a balanced use of nitrogen (N), phosphorus (P), and potassium (K) is recommended. Urea, DAP, and MOP are commonly used fertilizers depending on soil condition and crop stage.",
    keywords: ["rice", "fertilizers", "cultivation"]
  }
];

const FaqsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqsData);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSearch = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchTerm(input);
    const results = faqsData.filter(faq => 
      faq.question.toLowerCase().includes(input) || 
      faq.keywords.some(keyword => keyword.includes(input))
    );
    setFilteredFaqs(results);
    setShowFeedback(results.length === 0 && input.length > 0);
  };

  const submitFeedback = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      console.log("Feedback submitted:", searchTerm);
      setFeedbackMessage("🌱 Thank you! We've received your query and will add it soon.");

      // Reset page back to main FAQs
      setSearchTerm('');
      setFilteredFaqs(faqsData);
      setShowFeedback(false);

      // Hide success message after 5s
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-yellow-50 to-green-50 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl w-full my-10 border mt-20 border-green-200">
        
        {/* Page Title */}
        <div className="flex flex-col items-center mb-8">
          <FaSeedling className="text-green-600 text-5xl mb-3 animate-bounce" />
          <h2 className="text-4xl font-extrabold text-green-800 text-center">
            Farmer’s FAQs
          </h2>
          <p className="text-gray-600 text-center mt-2">
            🌾 Find simple answers to common farming questions
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-10">
          <input
            type="text"
            placeholder="🔍 Search for wheat, soil, yield..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-14 pr-4 py-3 border border-green-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
        </div>

        {/* FAQs List */}
        {filteredFaqs.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-green-50 hover:bg-green-100 transition duration-300 p-6 rounded-xl border border-green-200 shadow-md"
              >
                <h3 className="text-lg font-semibold text-green-800 flex items-start">
                  <FaQuestionCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="mt-3 text-gray-700 pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <FaTractor className="mx-auto text-4xl text-green-500 mb-4" />
            <p className="text-lg">No FAQs found for "{searchTerm}".</p>
          </div>
        )}

        {/* Feedback Section */}
        {showFeedback && (
          <div className="mt-10 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <h4 className="text-xl font-bold text-yellow-700 mb-3">
              Can't find your question? 🌻
            </h4>
            <p className="text-yellow-600 mb-4">
              Let us know and we’ll get back to you with an answer!
            </p>
            <form onSubmit={submitFeedback} className="flex justify-center">
              <button
                type="submit"
                className="flex items-center bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
              >
                <FaPaperPlane className="mr-2" /> Submit Question
              </button>
            </form>
          </div>
        )}

        {/* Feedback Confirmation */}
        {feedbackMessage && (
          <div className="mt-6 text-center text-green-700 font-semibold bg-green-50 p-3 rounded-lg border border-green-200">
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqsPage;