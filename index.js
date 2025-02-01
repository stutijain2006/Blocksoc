import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import "./styles.css"; // Ensure the CSS file is imported

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctors" element={<DoctorDashboard />} />
        <Route path="/patients" element={<PatientDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
