import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import NotFound from "./vendorDashboard/components/NotFound";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
