import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // 👈 make sure you have firebase.js

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import FaqsPage from "./pages/FAQs";
import CropDiseasePage from "./pages/CropDiseasePage";
import PredictCropPage from "./pages/CropPredict";
import LoginPage from "./pages/LoginPage";
import YieldPredictionPage from "./pages/YieldPerdiction";
import MarketPricePage from "./pages/MarketPricePage";

// 🔹 PrivateRoute component (Step 8)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [user, setUser] = useState(null);

  // 🔹 Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u); // u is null if logged out, or user object if logged in
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* The Header component is placed outside of Routes to appear on all pages */}
        <Header user={user} /> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage dashboardData={dashboardData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/predict-crop"
            element={<PredictCropPage setDashboardData={setDashboardData} />}
          />
          <Route path="/predict-yield" element={<YieldPredictionPage />} />
          <Route path="/market-prices" element={<MarketPricePage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/crop-disease" element={<CropDiseasePage />} />

          {/* Protected Route (only logged-in users can access) */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;