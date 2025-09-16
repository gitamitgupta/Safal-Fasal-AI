import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SoilStatus from "./pages/SoilStatus";
import Feedback from "./pages/Feedback";
import CurrentCrop from "./pages/CurrentCrop";

function App() {
  return (
    <>
      <Header />
      <Routes>
  <Route path="/" element={<Navigate to="/home" replace />} />
  <Route path="/home" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/soil-status" element={<SoilStatus />} />
  <Route path="/feedback" element={<Feedback />} />
  <Route path="/current-crop" element={<CurrentCrop />} />
</Routes>

    </>
  );
}

export default App;
