import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';

const faqsData = [
  {
    question: "What is the best time to plant wheat in North India?",
    answer: "The ideal time for planting wheat in North India is from mid-October to mid-November. This ensures the crop matures before the peak summer heat.",
    keywords: ["wheat", "planting time", "north india"]
  },
  {
    question: "How can I check my soil's nitrogen levels?",
    answer: "You can use a home soil testing kit, or for more accurate results, send a soil sample to a local agricultural laboratory. This gives you precise data on nitrogen, phosphorus, and potassium levels.",
    keywords: ["soil", "nitrogen", "testing"]
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
      // Here, you would typically send the feedback to a backend API
      console.log("Feedback submitted:", searchTerm);
      setFeedbackMessage("Thank you for your feedback! We've received your question and will add it to our list.");
      setSearchTerm(''); // Clear the search bar
      setShowFeedback(false);
      setTimeout(() => setFeedbackMessage(''), 5000); // Clear message after 5 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full my-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Frequently Asked Questions ❓
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Find answers to common questions asked by farmers.
        </p>

        {/* Search Bar Section */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Search for a question..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* FAQs List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 flex items-start">
                  <FaQuestionCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="mt-4 text-gray-600 pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No FAQs found for "{searchTerm}".</p>
          </div>
        )}

        {/* Feedback Section */}
        {showFeedback && (
          <div className="mt-10 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <h4 className="text-xl font-semibold text-yellow-700 mb-4">
              Can't find your question?
            </h4>
            <p className="text-yellow-600 mb-4">
              We'll send your query to our team to get an answer.
            </p>
            <form onSubmit={submitFeedback} className="flex justify-center">
              <button
                type="submit"
                className="flex items-center bg-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
              >
                <FaPaperPlane className="mr-2" /> Submit as Feedback
              </button>
            </form>
          </div>
        )}

        {feedbackMessage && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqsPage;