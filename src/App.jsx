import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Assuming Header.jsx is in a components folder
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile';
import FaqsPage from './pages/FAQs';
import CropDiseasePage from './pages/CropDiseasePage';
import PredictCropPage from './pages/CropPredict';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* The Header component is placed outside of Routes to appear on all pages */}
        <Header /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/crop-disease" element={<CropDiseasePage />} />
          <Route path="/predict-crop" element={<PredictCropPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;